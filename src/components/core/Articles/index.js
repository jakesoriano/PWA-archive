import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation, getConfigByKey } from '_helpers';
import { ImageLoader } from '_components/core';
import style from './style';
class Articles extends Component {
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
						{!this.props.isManagePage && <a
              id={`${this.props.dataType || 'article'}-like`}
							className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
							onClick={() => { this.props.onLikeCallback(i); }}>
								<ImageLoader
								src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
								style={{container: style.likeButton}}/>
								{getTranslation('LIKE')}
							</a> }
						<a
							className={`${this.props.dataType || 'article'}-share ${i.shared ? `extraBold ${style.buttonShareActive}` : ''}`}
							onClick={(e) => {
								e.stopPropagation();
								this.props.onShareCallback(i);
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
export default connect(['authUser'])(Articles);