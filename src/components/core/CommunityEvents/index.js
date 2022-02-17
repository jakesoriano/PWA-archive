import { Component } from 'preact';
import { shareEventByLeader } from '_mutations';
import { getTranslation, dateEventFormat } from '_helpers';
import { nativeShare } from '_platform/helpers';
import { ImageLoader } from '_components/core';
import { getCurrentUrl } from 'preact-router';
import style from './style';

class CommunityEvents extends Component {
 
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
			shareEventByLeader(item);
		}
	};


  renderDom = (data) => {
    if (data && data.length) {
      return data.map((i, index) => (
        <div className={`${style.contentItem} ${style.eventItem}`}>
          {
            !getCurrentUrl().includes('community') &&
            <div className={style.community}>
              <ImageLoader
                src={i.community.image}
                style={{container: style.comImage}}
                lazy />
              <span>{getTranslation(i.community.name)}</span>
            </div>
          }
          <a className={style.details} onClick={() => {
            this.props.onClickItemCallback(i);
          }}>
            <ImageLoader
              src={i.image}
              style={{container: style.detailImage}}
              lazy />
            <div className={style.detailContent}>
              <p>{dateEventFormat(i.date)} <br />
              {`${getTranslation('EVENT_BY')}: ${i.by}`} <br />
              {getTranslation(i.isOnline ? 'ONLINE_EVENT' : 'ONSITE_EVENT')}</p>
              <p className={`${style.stats} bold`}>
                <span className='extraBold'>{`${i.likeCount ? i.likeCount : '0'} ${getTranslation("LIKES")}`}</span>
                <span className='extraBold'>{`${i.shareCount ? i.shareCount : '0'} ${getTranslation("SHARES")}`}</span>
                <span className='extraBold'>{`${i.GOING_count ? i.GOING_count : '0'} ${getTranslation("GOING")}`}</span>
                <span className='extraBold'>{`${i.INTERESTED_count ? i.INTERESTED_count : '0'} ${getTranslation("INTERESTED")}`}</span>
                <span className='extraBold'>{`${i.NOT_INTERESTED_count ? i.NOT_INTERESTED_count : '0'} ${getTranslation("NOT_INTERESTED")}`}</span>
              </p>
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
              className={i.shared ? style.buttonShareActive : ''}
              onClick={() => {
                this.onShareEvent(i);
              }}>
              <ImageLoader
              src={!i.shared ? 'assets/images/share_icon_lite.png' : 'assets/images/share_icon_dark.png'}
              style={{container: `extraBold ${style.likeButton}`}}/>
              {getTranslation('SHARE')}
            </a>
          </div>
        </div>
      ))
    }

    return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  }
  render = ({ data, onClickItemCallback }) => {
    return (
      <div className={style.eventsListWrap}>
        { this.renderDom(data) }
      </div>
    );
  }
}
export default CommunityEvents;