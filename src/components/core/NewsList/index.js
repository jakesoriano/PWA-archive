import { Component } from 'preact';
import { getTranslation, getConfigByKey } from '_helpers';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
import { likeShareNews, removeLikeNews } from '_mutations';
import style from './style';
class NewsList extends Component {
	onLikeNews = (item) => {
	  if (!item.liked) {
	    likeShareNews(item, 'liked', item.community.id);
	  } else {
	    removeLikeNews(item, item.community.id);
	  }
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

  renderDom = (data) => {
    if (data && data.length) {
      return data.map(i => (
        <div className={style.contentItem}>
          <div className={style.community}>
            <ImageLoader
              src={i.community.image}
              style={{ container: style.comImage }}
              lazy />
            <span>{getTranslation(i.community.name)}</span>
          </div>
          <a className={style.details}
            onClick={() => {
              this.props.onClickItemCallback(i);
            }}>
            <ImageLoader
              src={i.image}
              style={{ container: style.detailImage }}
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
              id={'announcement-like'}
              className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
              onClick={() => {
                this.onLikeNews(i);
              }}>
              <ImageLoader
                src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
                style={{ container: style.likeButton }} />
              {getTranslation('LIKE')}
            </a>
            <a
              className={`announcement-share ${i.shared ? `extraBold ${style.buttonShareActive}` : ''}`}
              onClick={() => {
                this.onShareNews(i);
              }}>
              <ImageLoader
                src={!i.shared ? 'assets/images/share_icon_lite.png' : 'assets/images/share_icon_dark.png'}
                style={{ container: style.likeButton }} />
              {getTranslation('SHARE')}</a>
          </div>
        </div>
      ))
    }

    return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  }
  render = ({ data, authUser }) => {
    return (
      <div className={style.newsListWrap}>
        {this.renderDom(data)}
      </div>
    )
  }
}
export default NewsList;
