import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { 
	fetchAnnouncements, likeShareAnnouncements } from '_mutations';
import {
	getTranslation,
	getConfigByKey,
	dateNewsFormat
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader, LoaderRing } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class GlobalAnnouncement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
			moreFetching: false
		}
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

	componentDidMount = () => {
		fetchAnnouncements();
	};

	componentDidUpdate = () => {
    if (this.state.moreFetching && this.props.announcements && !this.props.announcements.fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }

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

	onClickItem = (data) => {
		this.setState({
			selectedItem: data
		});
	};

	handleShowMore = () => {
    if (!this.state.moreFetching) {
      this.setState({
        moreFetching: true
      });
      fetchAnnouncements(this.props.announcements.page + 1);
    }
  };

	seeAll = () => {
		route(`/global-announcements`);
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
						this.onShareAnnouncement(data);
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

	renderAnnouncements = () => {
		let announcements_ = this.props.announcements.data;
		const displayLimit = 3;
		if(this.props.isDisplayFlex && announcements_.length > displayLimit) {
			announcements_ = announcements_.slice(0,displayLimit);
		}
		return (
			<div className={style.announcementWindow}>
				{announcements_.length > 0 ? (
					<div className={`${style.announcementWrap} ${this.props.isDisplayFlex ? style.rows : ''} ${style['i' + announcements_.length]}`}>
						{announcements_.map((i) => (
							<div className={style.item}>
								<div className={style.details} onClick={() => {
									this.onClickItem(i);
								}}>
									<div className={style.imgContainer}>
										<ImageLoader
											src={i.image}
											style={{container: style.detailImage, image: style.img}}
										/>
									</div>
									<div className={`${style.detailContent} ${this.props.isDisplayFlex ? style.rows : ''}`}>
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
							</div>
						))}
					</div>
				) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
			</div>
		);
	};

	render = ({announcements, title},{selectedItem}) => {
	  return (
			<>
				<div className={`${style.globalAnnouncement} ${!this.props.isDisplayFlex ? style.marginTop : ''}`}>
					{/* Title */}
					{title && (
						<div className={style.tabWrap}>
							<span className={`bold ${style.activeTab}`}>
								{getTranslation('ANNOUNCEMENTS')}
							</span>
						</div>
					)}
					<div className={style.content}>
						{this.renderAnnouncements()}
						{/* show more - horizontal */}
						{this.props.isDisplayFlex && <p className={style.seeAll}>
							<span className='extraBold' onClick={this.seeAll}>{getTranslation('SEE_ALL')}</span>
						</p>}
						{/* show more - vertical */}
						{!this.props.isDisplayFlex && announcements.data.length < announcements.total && !announcements.fetching && (
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
				{selectedItem && this.renderDetails(selectedItem)}
			</>
		);
	};

}
export default connect(['announcements', 'authUser',])(GlobalAnnouncement);
