import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { 
	fetchAnnouncements, likeShareAnnouncements } from '_mutations';
import {
	getTranslation,
	playStore
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader, LoaderRing, GlobalAnnouncementsList } from '_components/core';
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
				Android: ${playStore}\n\n
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

	render = ({announcements},{selectedItem}) => {
	  return (
			<>
				<div className={`${style.globalAnnouncement} ${!this.props.isDisplayFlex ? style.marginTop : ''}`}>
					<div className={style.tabWrap}>
						<span className={`bold ${style.activeTab}`}>
							{getTranslation('GLOBAL_ANNOUNCEMENT')}
						</span>
					</div>
					<div className={style.content}>
						<GlobalAnnouncementsList data={announcements.data} isDisplayFlex={this.props.isDisplayFlex} authUser={this.props.authUser} onClickItemCallback={this.onClickItem} />
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
