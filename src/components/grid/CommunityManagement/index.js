import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { route } from 'preact-router';
import {
	fetchCommunityEvents,
	fetchCommunityAnnouncement,
	shareNewsByLeader } from '_mutations';
import {
	getTranslation,
	dateEventFormat,
	getConfigByKey
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader, LoaderRing, CommunityEvents, AnnouncementsList } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class CommunityManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: '',
			tabs: ['events', 'announcements'],
			selectedItem: null,
      moreFetching: false
		}
	};

	componentDidMount = () => {
		let { tabs } = this.state;
			this.setState({
				tabs: tabs,
				active: tabs[0]
			}, () => {
				this.initFetch()
			});
	};

	initFetch = () => {
		this.state.tabs.map((i) => { 
			if (i === 'events') {
				fetchCommunityEvents();
			} else if (i === 'announcements') {
				fetchCommunityAnnouncement();
			}
		});
	}

  componentDidUpdate = () => {
    if (this.state.moreFetching && this.getSelectedTabContent() && !this.getSelectedTabContent().fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }

  handleShowMore = () => {
    if (!this.state.moreFetching) {
			console.log('fetching');
			let { active } = this.state;
      // flag
      this.setState({
        moreFetching: true
      });
      // fetch
      if (active === 'events') {
				fetchCommunityEvents(this.getSelectedTabContent().page + 1);
      } else {
        fetchCommunityAnnouncement(this.getSelectedTabContent().page + 1);
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

	onShareNews = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`
		});
		if (!item.shared) {
			likeShareNews(item, 'shared', item.community.id);
		}
	};

	onShareEvent = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				Unity despite diversity leads to victory. Come join us, KakamPink!\n\n
				Event Title: ${item.title}\n
				Event Date: ${dateEventFormat(item.date)}\n
				${item.link ? 'Event Link: ' + item.link : ''}\n\n
				${getTranslation(item.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}:\n
				Event Location: ${item.location}
			`
		});
		if (!item.shared) {
			shareNewsByLeader(item);
		}
	};

	onShareAnnouncement = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`
		});
		if (!item.shared) {
			likeShareAnnouncements(item, 'shared');
		}
	};

	onClickEdit = (data) => {
		route(`/edit-post-content`);
		updateStore({
			leaderEditPost: {
				type: this.state.active,
				id: data.id
			}
		}, true);
	}

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
						{(this.state.active === 'announcements') ? (
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
					<div className={style.pShareButton}>
						<a className={style.pShare} onClick={() => {
							this.onClickEdit(data);
						}}>
							<span className='extraBold'>{getTranslation('EDIT')}</span>
						</a>
						<a className={style.pShare} onClick={() => {
							console.log('delete');
						}}>
							<span className='extraBold'>{getTranslation('DELETE')}</span>
						</a>
					</div>
				</div>
			)
		}
		return null;
	};

	renderAnnouncements = (data) => {
		return <AnnouncementsList data={data} authUser={this.props.authUser} isManagePage={true} onClickItemCallback={this.onClickItem} />
	};

	renderEvents = (data) => {
		return <CommunityEvents data={data} onClickItemCallback={this.onClickItem} />
	};

	renderData = (active) => {
		if (this.getSelectedTabContent()) {
			if (active === 'events') {
				return this.renderEvents(this.getSelectedTabContent().data)
			} else if (active === 'announcements') {
				return this.renderAnnouncements(this.getSelectedTabContent().data)
			}
		}
	}

	renderTabs = () => {
		return this.state.tabs.map((i) => {
			return (
				<span 
					className={`bold ${this.state.active === i ? style.activeTab : ''}`}
					onClick={() => {
						this.toggleTab(i);
					}}>{getTranslation(i.toUpperCase())}</span>
			);
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
						{ this.getSelectedTabContent() && this.getSelectedTabContent().page === 1 && !this.getSelectedTabContent().data.length && this.getSelectedTabContent().fetching 
							? <LoaderRing styles={{container: style.loaderWrapCenter}} />
							: this.renderData(state.active) }
						{/* show more */}
						{state.active && this.getSelectedTabContent() && this.getSelectedTabContent().data.length < this.getSelectedTabContent().total && !this.getSelectedTabContent().fetching && (
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

	getSelectedTabContent = () => {
		const activeTab = this.state.active === 'events' ? 'leaderCommunityEvents' : 'leaderCommunityAnnouncements';
		return this.props[activeTab];
	}
 
}
export default connect(['leaderCommunityEvents', 'leaderCommunityAnnouncements', 'authUser', 'communityDetails',])(CommunityManagement);
