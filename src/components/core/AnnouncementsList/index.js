import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getCurrentUrl } from 'preact-router';
import { getTranslation, getConfigByKey } from '_helpers';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
import {
	likeShareAnnouncements,
	removeLikeAnnouncements,
	likeShareArticles,
	removeLikeArticles
} from '_mutations';
import style from './style';
class AnnouncementsList extends Component {
  
	onLikeAnnouncement = (item) => {
		if (!item.liked) {
			getCurrentUrl().includes('lenipedia') ? likeShareArticles(item, 'liked') : likeShareAnnouncements(item, 'liked');
		} else {
			getCurrentUrl().includes('lenipedia') ? removeLikeArticles(item) : removeLikeAnnouncements(item);
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
			getCurrentUrl().includes('lenipedia') ? likeShareArticles(item, 'shared') : likeShareAnnouncements(item, 'shared');
		}
	};

  renderDom = (data) => {
		if (data && data.length) {
			return data.map(i => (
				<div className={style.contentItem}>
					<a className={style.details} onClick={() => {
						this.props.onClickItemCallback(i);
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
								this.onLikeAnnouncement(i);
							}}>
								<ImageLoader
								src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
								style={{container: style.likeButton}}/>
								{getTranslation('LIKE')}
							</a>
						<a
							className={i.shared ? `extraBold ${style.buttonShareActive}` : ''}
							onClick={() => {
								this.onShareAnnouncement(i);
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
  }
  render = ({data, authUser}) => {
    return (
      <div className={style.announcementsListWrap}>
        {this.renderDom(data)}
      </div>
    )
  }
}
export default connect(['authUser'])(AnnouncementsList);