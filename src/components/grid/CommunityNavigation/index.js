import { Component } from 'preact';
import { route } from 'preact-router';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
class CommunityNavigation extends Component {
  render = () => (
    <div className={style.communityNavigationWrap}>
      <div className={`${style.navBox} ${style.events}`}>
        <div onClick={() => route('community-events-v2')}>
          <ImageLoader
            src={'assets/icons/community_events_icon.png' || getDefaultAvatar()}
            style={{ container: style.icon }}
            lazy
          />
        </div>
        <p className='semiBold'>{`${getTranslation('PAGE_COMMUNITY')} ${getTranslation('EVENTS')}`}</p>
      </div>
      <div className={`${style.navBox} ${style.announcements}`}>
        <div onClick={() => route('community-announcements')}>
          <ImageLoader
            src={'assets/icons/community_announcements_icon.png' || getDefaultAvatar()}
            style={{ container: style.icon }}
            lazy
          />
        </div>
        <p className='semiBold'>{`${getTranslation('PAGE_COMMUNITY')} ${getTranslation('ANNOUNCEMENTS')}`}</p>
      </div>
    </div>
  )
}
export default CommunityNavigation;