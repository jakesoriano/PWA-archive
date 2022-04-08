import { Component } from 'preact';
import { route } from 'preact-router';
import { ImageLoader } from '_components/core';
import {
  getTranslation,
  isUserUpdatedProfile,
  circleModal,
  getDefaultAvatar,
} from '_helpers';
import { connect } from 'unistore/preact';
import style from './style';
class CommunityNavigation extends Component {
	render = () => (
	  <div className={style.communityNavigationWrap}>
	    {/* Community Volunteer */}
	    <div
	      className={`${style.navBox} ${style.events}`}
	      id="community-volunteer"
	      onClick={(e) => {
	        e.stopPropagation();
	        // this will display a popup to update profile first
	        if (!isUserUpdatedProfile()) {
	          circleModal({
	            title: getTranslation('UPDATE_YOUR_PROFILE'),
	            content: getTranslation('UPDATE_YOUR_PROFILE_BODY'),
	            link: {
	              url: '/profile',
	              text: getTranslation('UPDATE_YOUR_PROFILE_LINK'),
	            },
	          });
	        } else {
	          route('community-volunteer');
	        }
	      }}
	    >
	      <div>
	        <ImageLoader
	          src={
	            'assets/images/community_volunteer_blue.png' || getDefaultAvatar()
	          }
	          style={{ container: style.icon }}
	          lazy
	        />
	      </div>
	      <p className="semiBold">{getTranslation('COMMUNITY_VOLUNTEER')}</p>
	    </div>

	    {/* Community CrowdSourcing */}
	    <div
	      className={`${style.navBox} ${style.events}`}
	      id="community-crowdsourcing"
	      onClick={() => route('community-crowdsourcing')}
	    >
	      <div>
	        <ImageLoader
	          src={
	            'assets/images/community_crowdsourcing_blue.png' ||
							getDefaultAvatar()
	          }
	          style={{ container: style.icon }}
	          lazy
	        />
	      </div>
	      <p className="semiBold">{getTranslation('PAGE_CROWDSOURCING')}</p>
	    </div>

	    {/* Community Events */}
	    <div
	      className={`${style.navBox} ${style.events}`}
	      id="community-events"
	      onClick={() => route('community-events-v2')}
	    >
	      <div>
	        <ImageLoader
	          src={
	            'assets/images/community_events_blue.png' || getDefaultAvatar()
	          }
	          style={{ container: style.icon }}
	          lazy
	        />
	      </div>
	      <p className="semiBold">{getTranslation('EVENTS')}</p>
	    </div>

	    {/* Community Announcements */}
	    <div
	      className={`${style.navBox} ${style.announcements}`}
	      id="community-announcements"
	      onClick={() => route('community-announcements')}
	    >
	      <div>
	        <ImageLoader
	          src={
	            'assets/images/community_announcements_blue.png' ||
							getDefaultAvatar()
	          }
	          style={{ container: style.icon }}
	          lazy
	        />
	      </div>
	      <p className="semiBold">{getTranslation('ANNOUNCEMENTS')}</p>
	    </div>
	  </div>
	);
}
export default connect(['popupModal', 'authUser'])(CommunityNavigation);
