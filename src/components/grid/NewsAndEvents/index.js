import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { 
	fetchNews,
	fetchNewsByCommunity,
	fetchEvents,
	likeShareNews,
	shareEvent,
	removeLikeNews,
	selectTag } from '_mutations';
import {
	getTranslation,
	dateEventFormat,
	playStore
} from '_helpers';
import { ImageLoader, LoaderRing } from '_components/core';
import { nativeShare } from '_platform/helpers';
import { getCurrentUrl } from 'preact-router';
// eslint-disable-next-line import/extensions
import style from './style';
const eventTags = [
	'INTERESTED',
	'GOING',
	'NOT_INTERESTED'
];

// eslint-disable-next-line react/prefer-stateless-function
class NewsAndEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'events',
			selectedItem: null,
			eventDropdown: null,
      moreFetching: false
		}
	};

	componentDidMount = () => {
		this.fetchNews();
		fetchEvents();
	};

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

	onLikeNews = (item) => {
		if (!item.liked) {
			likeShareNews(item, 'N', 'liked', item.community.id);
		} else {
			removeLikeNews(item, 'N', item.community.id);
		}
	}

	onShareNews = (item) => {
		nativeShare({
			url: item.image,
			title: item.title,
			message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${playStore}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`
		});
		if (!item.shared) {
			likeShareNews(item, 'N', 'shared', item.community.id);
		}
	};

	onClickInterested = (item) => {
		this.setState({
			eventDropdown: {
				show: true,
				id: item.id,
				tagged: item.tagged
			}
		});
	}

	onSelectEventTag = (tag, item) => {
		selectTag(tag, item);
		this.setState({
			eventDropdown: null,
		});
	};

	renderEventsDropdown = (item, isLastItem) => {
		const { eventDropdown } = this.state;
		if (eventDropdown && eventDropdown.show && eventDropdown.id === item.id) {
			return (
				<div 
					className={`${eventDropdown.tagged === 'INTERSTED'} ${style.selectEventDropdown} ${isLastItem ? style.lastItem : ''}`}>
					{eventTags.map(tag => (
						<a
							className={eventDropdown.tagged === tag ? 'extraBold' : ''}
							onClick={() => {
								this.onSelectEventTag(tag, item)
							}}>
								<ImageLoader
								src={ `assets/images/${tag}-${eventDropdown.tagged === tag ? 'pink' : 'dark'}.png`}
								style={{container: style.likeButton}}/>
								{getTranslation(tag)}
						</a>
					))}
				</div>
			);
		}
		return null;
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
			shareEvent(item);
		}
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
					<div className={`${style.pHeader} ${this.state.active !== 'news' ? style.pHeaderEvents : ''}`}>
						<ImageLoader
								src={data.image}
								style={{container: style.pImage}}
								lazy />
						{this.state.active === 'news' ? (
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
		if (data.length) {
			return data.map(i => (
				<div className={style.contentItem}>
					<div className={style.community}>
						<ImageLoader
							src={i.community.image}
							style={{container: style.comImage}}
							lazy />
						<span>{getTranslation(i.community.name)}</span>
					</div>
					<a className={style.details} onClick={() => {
						this.onClickItem(i);
					}}>
						<ImageLoader
							src={i.image}
							style={{container: style.detailImage}}
							lazy />
						<div className={style.detailContent}>
							<span className={`bold ${style.detailTitle}`}>{getTranslation(i.title)}</span>
							{i.likeCount || i.shareCount ? (
								<div className={style.detailCount}>
									{i.likeCount ? <span>{`${i.likeCount} ${getTranslation('LIKES')}`}</span> : ''}
									{i.shareCount ? <span>{`${i.shareCount} ${getTranslation('SHARES')}`}</span> :''}
								</div>
							): null}
						</div>
					</a>
					<div className={style.buttons}>
						<a
							className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
							onClick={() => {
								this.onLikeNews(i);
							}}>
								<ImageLoader
								src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
								style={{container: style.likeButton}}/>
								{getTranslation('LIKE')}
							</a>
						<a
							className={i.shared ? `extraBold ${style.buttonShareActive}` : ''}
							onClick={() => {
								this.onShareNews(i);
							}}>
								<ImageLoader
								src={!i.shared ? 'assets/images/share_icon_lite.png' : 'assets/images/share_icon_dark.png'}
								style={{container: style.likeButton}}/>
								{getTranslation('SHARE')}</a>
					</div>
				</div>
			))
		}

		return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
	};

	renderEvents = (data) => {
		if (data.length) {
			return data.map((i, index) => (
				<div className={`${style.contentItem} ${style.eventItem}`}>
					<div className={style.community}>
						<ImageLoader
							src={i.community.image}
							style={{container: style.comImage}}
							lazy />
						<span>{getTranslation(i.community.name)}</span>
					</div>
					<a className={style.details} onClick={() => {
						this.onClickItem(i);
					}}>
						<ImageLoader
							src={i.image}
							style={{container: style.detailImage}}
							lazy />
						<div className={style.detailContent}>
							<p>{dateEventFormat(i.date)} <br />
							{`${getTranslation('EVENT_BY')}: ${i.by}`} <br />
							{getTranslation(i.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}</p>
							{i.likeCount || i.shareCount ? (
								<div className={style.detailCount}>
									{i.likeCount && <span>{`${i.likeCount} ${getTranslation('LIKES')}`}</span>}
									{i.shareCount && <span>{`${i.shareCount} ${getTranslation('SHARES')}`}</span>}
								</div>
							): null}
						</div>
					</a>
					<div className={style.buttons}>
						<a
							className={i.tagged ? `extraBold ${style.buttonLikeActive}` : ''}
							id={i.id}
							onClick={() => {
								this.onClickInterested(i);
							}}
							>
							<ImageLoader
							src={!i.tagged ? 'assets/images/INTERESTED-dark.png' : `assets/images/${i.tagged}-pink.png`}
							style={{container: style.likeButton}}/>
							{getTranslation(i.tagged || eventTags[0])}
							<ImageLoader
								src={'assets/images/drop_down_icon.png'}
								style={{container: style.likeButton}}/>
						</a>
						<a
							className={i.shared ? style.buttonShareActive : ''}
							onClick={() => {
								this.onShareEvent(i);
							}}>
							<ImageLoader
							src={!i.shared ? 'assets/images/share_icon_lite.png' : 'assets/images/share_icon_dark.png'}
							style={{container: `extraBold ${style.likeButton}`}}/>
							{getTranslation('SHARE')}
						</a>
						{this.renderEventsDropdown(i, (data.length - 1) === index)}
					</div>
				</div>
			))
		}

		return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
	};

	renderData = (active) => {

		if (active === 'news') {
			this.renderNews(props[state.active].data)
		} else if (active === 'events') {
			
		} else {
			this.renderEvents(props[state.active].data)}
		}
	}

	render = (props, state) => {
	  return (
			<>
				<div className={style.newsAndEvents}>
					<div className={style.tabWrap}>
						<span 
							className={`bold ${state.active === 'events' ? style.activeTab : ''}`}
							onClick={() => {
								this.toggleTab('events');
							}}>{getTranslation('EVENTS')}</span>
						{
							props.showNews &&
							<span 
								className={`bold ${state.active === 'news' ? style.activeTab : ''}`}
								onClick={() => {
									this.toggleTab('news');
								}}>{getTranslation('IWAS_FAKE_NEWS')}</span>
						}
						<span 
								className={`bold ${state.active === 'announcements' ? style.activeTab : ''}`}
								onClick={() => {
									this.toggleTab('news');
								}}>{getTranslation('IWAS_FAKE_NEWS')}</span>
					</div>
					<div className={style.content}>
						{/* data */}
						{ this.renderData() }
						{/* show more */}
						{props[state.active].data.length < props[state.active].total && !props[state.active].fetching && (
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
export default connect(['news', 'events', 'authUser', 'communityDetails'])(NewsAndEvents);
