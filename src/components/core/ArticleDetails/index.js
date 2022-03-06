import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation, dateNewsFormat, getConfigByKey } from '_helpers';
import { ImageLoader } from '_components/core';
import { nativeShare } from '_platform/helpers';
import { likeShareAnnouncements } from '_mutations';
import style from './style';
class ArticleDetails extends Component {
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
			`,
	  });
	  if (!item.shared) {
	    likeShareAnnouncements(item, 'shared');
	  }
	};
	render = ({ data }) => {
	  return (
	    <div className={style.pWrap}>
	      <div className={`${style.pHeader}`}>
	        <div className={style.pNews}>
	          <p className={`bold ${style.pTitle}`}>
	            {getTranslation(data.title)}
	          </p>
	        </div>
	        {data.image && (
	          <div
	            className={`${style.pHeader} ${
								this.state.active === 'events' ? style.pHeaderEvents : ''
							}`}
	          >
	            <ImageLoader
	              src={data.image}
	              style={{ container: style.pImage }}
	              lazy
	            />
	          </div>
	        )}
	        <p className={`${style.pDate}`}>{dateNewsFormat(data.postedDate)}</p>
	        <a href={data.link} className={`${style.pLink}`}>
	          {data.link}
	        </a>
	        <p
	          className={style.pContent}
	          dangerouslySetInnerHTML={{
	            __html: data.desc,
	          }}
	        />
	        <a
	          id="global-announcement-share"
	          className={style.pShare}
	          onClick={() => {
	            this.onShareAnnouncement(data);
	          }}
	        >
	          <ImageLoader
	            src="assets/images/share_icon_white.png"
	            style={{ container: style.pIconShare }}
	          />
	          <span>{getTranslation('SHARE')}</span>
	        </a>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(ArticleDetails);
