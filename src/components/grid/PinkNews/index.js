import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
import { likeShareAnnouncements } from '_mutations';
import { dateNewsFormat, getTranslation, getConfigByKey } from '_helpers';
import style from './style';
class PinkNews extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedItem: null
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
	onShowPopup = (data) => {
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
					<div className={style.pHeader}>
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
                        this.onShareAnnouncement(this.state.selectedItem);
					}}>
						<ImageLoader
								id={'announcement-like'}
								src="assets/images/share_icon_white.png"
								style={{container: style.pIconShare}} />
							<span>{getTranslation('SHARE')}</span>
					</a>
				</div>
			)
		}
		return null;
	};
    render = ({announcements}, {selectedItem}) => (
        <div className={style.pnWrap}>
            <div className={style.news}>
                {
                    announcements?.data?.length && <div className={style.item}>
                        <p className={`extraBold ${style.title}`}>{announcements?.data[0]?.title}</p>
                        <p className={style.date}>{dateNewsFormat(announcements?.data[0]?.postedDate)}</p>
                        <p className={style.description}>{announcements?.data[0]?.desc}</p>
                        <a className={`extraBold ${style.button}`} onClick={() => this.onShowPopup(announcements?.data[0])}>{getTranslation('VIEW')}</a>
                    </div>
                }
                {
                    !announcements?.data?.length && <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
                }
            </div>
            <div className={style.nav}>
                <div className={style.item} onClick={() => route('lenipedia')}>
                    <ImageLoader 
                        src={'assets/icons/icon_search_blue.png'}
                        style={{container: style.navImgContainer}}
                        lazy
                    />
                    <a className={`extraBold ${style.name}`}>
                        {`${getTranslation('SEARCH')} ${getTranslation('PINK_PEDIA')}`}
                    </a>
                </div>
                <div className={style.item} onClick={() => route('global-announcements')}>
                    <ImageLoader 
                        src={'assets/icons/icon_news_blue.png'}
                        style={{container: style.navImgContainer}}
                        lazy
                    />
                    <a className={`extraBold ${style.name}`}>{getTranslation('SEE_ALL_NEWS')}</a>
                </div>
            </div>
            {selectedItem && this.renderDetails(selectedItem)}
        </div>
    )
}
export default connect(['authUser', 'announcements'])(PinkNews);