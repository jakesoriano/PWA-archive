import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import { LoaderRing, UserAvatar } from '_components/core';
import {
  getTranslation,
  formatNumber,
  getConfigByKey,
  circleModal,
  displayName,
  showAlertBox,
  isUserUpdatedProfile,
	isCommunityLeader
} from '_helpers';
import { fetchUserPoints } from '_mutations';
import { nativeShare } from '_platform/helpers';
import { updateStore } from '_unistore';
import copy from 'clipboard-copy';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
  constructor(props) {
    super(props);
  }

	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (authUser) {
	    fetchUserPoints();
	    if (authUser.hasOwnProperty('isNewUser') && authUser.isNewUser) {
	      circleModal({
	        title: getTranslation('ITS_OFFICIAL'),
	        content: getTranslation('YOURE_KAKAMPINK'),
	        code: authUser.profile.refCode,
	      });
	      updateStore({
	        authUser: {
	          ...authUser,
	          isNewUser: false,
	        },
	      });
	    }
	  }
	};

	copyText = (text) => {
	  copy(text);
	  showAlertBox({
	    message: 'COPY_MSG_REFCODE',
	    success: true,
	  });
	};

	onShare = () => {
	  nativeShare({
	    title: `Be a Hero`,
	    message: `\n
				I've earned ${this.props.authUser.points} Hero Points!\n
				Download the KakamPink App!\n\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n
				Use my invite code: ${this.props.authUser.profile.refCode}\n\n
				#LetLeniLead
			`,
	  });
	};

	render = ({ authUser, page }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.profileWrap}>
	      {/* top */}
	      <div className={style.top}>
	        <UserAvatar allowUpdate styles={{ avatar: style.avatar }} />
	        <p className={`bold ${style.text}`}>
	          {displayName(authUser.profile)}
	        </p>
	        <a
	          id={`${page}-update-profile`}
	          className={`${style.button} ${style.update}`}
	          onClick={() => route('update-profile')}
	        >
	          {isUserUpdatedProfile() ? (
	            <span className={style.dot}></span>
	          ) : null}
	          {getTranslation('UPDATE_PROFILE')}
	        </a>
	      </div>
	      {/* bottom */}
	      <div className={style.bottom}>
	        <div>
	          <p className={style.text}>{getTranslation('ACCOUNT_LEVEL')}</p>
	          {isCommunityLeader() ? (
	            <p className={`bold ${style.text}`}>
	              {getTranslation('LABEL_COMMUNITY_LEADER')}
	            </p>
	          ) : (
	            <p className={`bold ${style.text}`}>{getTranslation('MEMBER')}</p>
	          )}
	        </div>
	        <div>
	          <p className={style.text}>{getTranslation('HERO_POINTS')}</p>
	          <p className={`bold ${style.text}`}>
	            {authUser.points === 0
	              ? '-'
	              : formatNumber(authUser.points, 2) || 0}{' '}
	            {getTranslation('POINTS')}
	          </p>
	        </div>
	        <a
	          id={`${page}-invite`}
	          className={`${style.button} ${style.invite}`}
	          onClick={() => route('invite')}
	        >
	          {getTranslation('REPORT')}
	        </a>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(AccountProfile);
