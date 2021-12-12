import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { 
	fetchNews, 
	fetchEvents,
	likeShareNews,
	shareEvent,
	removeLikeNews,
	selectTag } from '_mutations';
import { getTranslation, dateEventFormat, playStore, appStore } from '_helpers';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
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
			active: 'news',
			selectedItem: null,
			eventDropdown: null
		}
	};

	componentDidMount = () => {
		fetchNews();
		fetchEvents();
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
			likeShareNews(item, 'N', 'liked');
		} else {
			removeLikeNews(item, 'N');
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
				Android: ${playStore}\n
				Apple: ${appStore}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`
		});
		if (!item.shared) {
			likeShareNews(item, 'N', 'shared');
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
							}}>{getTranslation(tag)}
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
					<a className={`extraBold ${style.pClose}`} onClick={() => {
						this.setState({
							selectedItem: null
						});
					}}>x</a>
					<div className={`${style.pHeader} ${this.state.active !== 'news' ? style.pHeaderEvents : ''}`}>
						<ImageLoader
								src={data.image}
								style={{container: style.pImage}} />
						{this.state.active === 'news' ? (
							<div className={style.pNews}>
								<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
								<a className={style.pLink} href={data.link}>{data.link}</a>
							</div>
						) : (
							<div className={style.pEvents}>
								<p className={`${style.pTitle}`}>{getTranslation(data.title)}</p>
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
							style={{container: style.comImage}} />
						<span>{getTranslation(i.community.name)}</span>
					</div>
					<a className={style.details} onClick={() => {
						this.onClickItem(i);
					}}>
						<ImageLoader
							src={i.image}
							style={{container: style.detailImage}} />
						<div className={style.detailContent}>
							<span className={`bold ${style.detailTitle}`}>{getTranslation(i.title)}</span>
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
							style={{container: style.comImage}} />
						<span>{getTranslation(i.community.name)}</span>
					</div>
					<a className={style.details} onClick={() => {
						this.onClickItem(i);
					}}>
						<ImageLoader
							src={i.image}
							style={{container: style.detailImage}} />
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
							{getTranslation(i.tagged || eventTags[0])}
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

	render = ({ news, events }, state) => {
	  return (
			<div className={style.newsAndEvents}>
				<div className={style.tabWrap}>
					<span 
						className={`bold ${state.active === 'news' ? style.activeTab : ''}`}
						onClick={() => {
							this.toggleTab('news');
						}}>{getTranslation('IWAS_FAKE_NEWS')}</span>
					<span 
						className={`bold ${state.active !== 'news' ? style.activeTab : ''}`}
						onClick={() => {
							this.toggleTab('events');
						}}>{getTranslation('EVENTS')}</span>
				</div>
				<div className={style.content}>
					{state.active === 'news' ? this.renderNews(news.data) : this.renderEvents(events.data)}
				</div>
				{state.selectedItem && this.renderDetails(state.selectedItem)}
			</div>
		);
	};
}
export default connect(['news', 'events', 'authUser'])(NewsAndEvents);
