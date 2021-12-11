import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { 
	fetchNews, 
	fetchEvents,
	likeShareNews,
	removeLikeNews } from '_mutations';
import { getTranslation, dateEventFormat, playStore, appStore } from '_helpers';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewsAndEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'news',
			selectedItem: null,
		}
	};

	componentDidMount = () => {
		const { news, events } = this.props;
		if (!news.result && !news.fetching) {
			fetchNews();
		}
		if (!events.result && !events.fetching) {
			fetchEvents();
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
				Use my invite code: ${this.props.authUser.refCode}
			`
		});
		if (!item.shared) {
			likeShareNews(item, 'N', 'shared');
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
							className={i.liked ? style.buttonLikeActive : ''}
							onClick={() => {
								this.onLikeNews(i);
							}}>{getTranslation('LIKE')}</a>
						<a
							className={i.shared ? style.buttonShareActive : ''}
							onClick={() => {
								this.onShareNews(i);
							}}>{getTranslation('SHARE')}</a>
					</div>
				</div>
			))
		}

		return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
	};

	renderEvents = (data) => {
		if (data.length) {
			return data.map(i => (
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
							className={`bold ${style.buttonLike} ${i.liked ? style.buttonLikeActive : ''}`}>{getTranslation('LIKE')}</a>
						<a
							className={`bold ${style.buttonShare} ${i.liked ? style.buttonShareActive : ''}`}
							onClick={() => {
								this.onShareEvent(i);
							}}>{getTranslation('SHARE')}</a>
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
