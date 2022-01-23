import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { 
	fetchNews,
	fetchNewsByCommunity,
	fetchEvents,
	fetchAnnouncements } from '_mutations';
import {
	getTranslation,
	dateEventFormat
} from '_helpers';
import { ImageLoader, LoaderRing, EventsList, AnnouncementsList, NewsList } from '_components/core';
import { getCurrentUrl } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewsAndEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: '',
			tabs: ['events', 'announcements', 'news'],
			selectedItem: null,
      moreFetching: false
		}
	};

	componentDidMount = () => {
		const { hiddenTabs } = this.props;
		let { tabs } = this.state;
		if (hiddenTabs) {
			tabs = tabs.filter((i) => hiddenTabs.indexOf(i) === -1);
			this.setState({
				tabs: tabs,
				active: tabs[0]
			}, () => {
				this.initFetch()
			});
		} else {
			this.initFetch()
		}
	};

	initFetch = () => {
		this.state.tabs.map((i) => { 
			if (i === 'events') {
				fetchEvents();
			} else if (i === 'news') {
				fetchNews();
			} else if (i === 'announcements') {
				fetchAnnouncements();
			}
		});
	}

  componentDidUpdate = () => {
    if (this.state.moreFetching && !this.props[this.state.active].fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }

  handleShowMore = () => {
    if (!this.state.moreFetching) {
      // flag
      this.setState({
        moreFetching: true
      });
      // fetch
      if (this.state.active === 'news') {
        fetchNews(this.props[this.state.active].page + 1);
      } else {
        fetchEvents(this.props[this.state.active].page + 1);
      }
    }
  };

	toggleTab = (tab) => {
		this.setState({
			active: tab
		})
	}

	onClickItem = (data) => {
		this.setState({
			selectedItem: data
		});
	};

	renderDetails = (data) => {
		if (data) {
			return (
				<div className={style.pWrap}>
					<a className={`${style.pClose}`} onClick={() => {
						this.setState({
							selectedItem: null
						});
					}}>
						<ImageLoader
							src="assets/images/closebutton.png"
							style={{container: style.closeBtn}}
						/>
					</a>
					<div className={`${style.pHeader} ${this.state.active === 'events' ? style.pHeaderEvents : ''}`}>
						<ImageLoader
								src={data.image}
								style={{container: style.pImage}}
								lazy />
						{(this.state.active === 'news' || this.state.active === 'announcements') ? (
							<div className={style.pNews}>
								<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
								<a className={style.pLink} href={data.link}>{data.link}</a>
							</div>
						) : (
							<div className={style.pEvents}>
								<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
								<p className={`${style.pDate}`}>
									{`${getTranslation('WHEN')}: ${dateEventFormat(data.date)}`} <br />
									{`${getTranslation('WHERE')}: ${data.location}`}
								</p>
							</div>
						)}
					</div>
					<p
						className={style.pContent}
						dangerouslySetInnerHTML={{
							__html: data.desc
						}}
					/>
					<a className={style.pShare} onClick={() => {
						if(this.state.active == 'news') {
							this.onShareNews(this.state.selectedItem);
						} else {
							this.onShareEvent(this.state.selectedItem);
						}
					}}>
						<ImageLoader
								src="assets/images/share_icon_white.png"
								style={{container: style.pIconShare}} />
							<span>{getTranslation('SHARE')}</span>
					</a>
				</div>
			)
		}
		return null;
	};

	renderNews = (data) => {
		return <NewsList data={data} authUser={this.props.authUser} onClickItemCallback={this.onClickItem} />
	};

	renderAnnouncements = (data) => {
		return <AnnouncementsList data={data} authUser={this.props.authUser} onClickItemCallback={this.onClickItem} />
	};

	renderEvents = (data) => {
		return <EventsList data={data} onClickItemCallback={this.onClickItem} />
	};

	renderData = (active) => {
		let selector = (getCurrentUrl().includes('community') && active === 'events') ? this.props.communityDetails[active] : this.props[active];
		if (active === 'news') {
			return this.renderNews(selector.data)
		} else if (active === 'events') {
			return this.renderEvents(selector.data)
		} else if (active === 'announcements') {
			return this.renderAnnouncements(selector.data)
		}
	}

	renderEventsTab = () => {
		return (
			<span 
				className={`bold ${this.state.active === 'events' ? style.activeTab : ''}`}
				onClick={() => {
					this.toggleTab('events');
				}}>{getTranslation('EVENTS')}</span>
		);
	}

	renderNewsTab = () => {
		return (
			<span 
				className={`bold ${this.state.active === 'news' ? style.activeTab : ''}`}
				onClick={() => {
					this.toggleTab('news');
				}}>{getTranslation('NEWS')}</span>
		);
	}

	renderAnnouncementsTab = () => {
		return (
			<span 
				className={`bold ${this.state.active === 'announcements' ? style.activeTab : ''}`}
				onClick={() => {
					this.toggleTab('announcements');
				}}>{getTranslation('IWAS_FAKE_NEWS')}</span>
		);
	}

	renderTabs = () => {
		return this.state.tabs.map((i) => {
			if (i === 'events') {
				return this.renderEventsTab();
			}
			if (i === 'news') {
				return this.renderNewsTab();
			}
			if (i === 'announcements') {
				return this.renderAnnouncementsTab();
			}
		});
	}

	render = (props, state) => {
	  return (
			<>
				<div className={style.newsAndEvents}>
					<div className={style.tabWrap}>
						{state.active && this.renderTabs()}
					</div>
					<div className={style.content}>
						{/* data */}
						{ this.renderData(state.active) }
						{/* show more */}
						{state.active && props[state.active] && props[state.active].data.length < props[state.active].total && !props[state.active].fetching && (
							<button className={style.showMore} onClick={this.handleShowMore}>
								<span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
							</button>
						)}
						{/* loader */}
						{this.state.moreFetching && (
							<LoaderRing styles={{container: style.loaderWrap}}/>
						)}
					</div>
				</div>
				{state.selectedItem && this.renderDetails(state.selectedItem)}
			</>
		);
	};

	selected = (selected) => {
		return getCurrentUrl().includes('community') ? this.props.communityDetails[selected] : this.props[selected]
	}
 
	fetchNews = () => {
		if (getCurrentUrl().includes('community')) {
			let { id } = this.props.communityDetails;
			fetchNewsByCommunity(id)
		} else {
			fetchNews();
		}
	}
}
export default connect(['news', 'events', 'announcements', 'authUser', 'communityDetails',])(NewsAndEvents);
