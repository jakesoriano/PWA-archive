import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { fetchAnnouncements } from '_mutations';
import {
	getTranslation,
	dateNewsFormat
} from '_helpers';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class GlobalAnnouncement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
		}
	};

	componentDidMount = () => {
		fetchAnnouncements();
	};

	removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

	onClickAnnouncement = (data) => {
		this.setState({
			selectedItem: data
		});
	}

	onShare = (data) => {
		nativeShare({
			url: data.image,
			title: data.title,
			message: `A Kakampink Story!\n\n
				Title: ${data.title}\n
				Description: ${data.desc}
			`
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
						<div className={style.pNews}>
							<p className={`bold ${style.pTitle}`}>{getTranslation(data.title)}</p>
							<a className={style.pLink} href={data.link}>{data.link}</a>
						</div>
					</div>
					<p
						className={style.pContent}
						dangerouslySetInnerHTML={{
							__html: data.desc
						}}
					/>
					<a className={style.pShare} onClick={() => {
						this.onShare(data);
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

	render = ({ announcements, authUser },{selectedItem}) => {
		if (!authUser) {
			return null;
		}
		const announcements_ = announcements.data.slice(0,3);
		return (
			<>
				<div className={style.announcementWrapper}>
					<div className={style.announcementHead}>
						<p className={` bold ${style.title}`}>{getTranslation('GLOBAL_ANNOUNCEMENT')}</p>
					</div>
					<div className={style.announcementBody}>
						<div className={style.announcementWindow}>
							{announcements_.length > 0 ? (
								<div className={`${style.announcementWrap} ${style['i' + announcements_.length]}`}>
									{announcements_.map((i) => (
										<div className={style.item}>
											<div className={style.details} onClick={() => {
												this.onClickAnnouncement(i)
											}}>
												<ImageLoader
													src={i.image}
													style={{container: style.detailImage}}
												/>
												<div className={style.detailContent}>
													<div className={style.detailHead}>
														<span className={`extraBold ${style.userName}`}>
															{`${i.title.length > 30 ? `${this.removeTags(i.title || '').substr(0, 30)}...` :  i.title }`}
														</span>
													</div>
													<div className={style.detailBody}>
														<p className={`${style.detailTitle}`}>
															{dateNewsFormat(i.postedDate)}</p>
														<p className={style.detailDescription}>{this.removeTags(i.desc || '').substr(0, 100)}...
															<span className='extraBold'> {`${i.desc.length > 100 ? `${getTranslation('READ_ALL')}`: ''}`}</span>
														</p>
													</div>
												</div>
											</div>
											{/* <div className={style.buttons}>
												<a
													className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
													onClick={() => {
														this.onLikeAnnouncement(i);
													}}
													>
														<ImageLoader
														src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
														style={{container: style.likeButton}}/>
														{getTranslation('LIKE')}
													</a>
											</div> */}
										</div>
									))}
								</div>
							) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
						</div>
					</div>
					<p className={style.seeAll}>
						<span className='extraBold'>{getTranslation('SEE_ALL')}</span>
					</p>
				</div>
				{selectedItem && this.renderDetails(selectedItem)}
			</>
		);
	};
}
export default connect(['announcements', 'authUser'])(GlobalAnnouncement);
