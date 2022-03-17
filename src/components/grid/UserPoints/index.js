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
} from '_helpers';
import { fetchUserPoints } from '_mutations';
import { nativeShare } from '_platform/helpers';
import { updateStore } from '_unistore';
import copy from 'clipboard-copy';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class UserPoints extends Component {
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
	    <div className={style.userPoints}>
	      <div className={style.top}>
	        <UserAvatar allowUpdate styles={{ avatar: style.avatar }} />
	        <div className={style.points}>
	          <span className={style.text}>{getTranslation('HERO_POINTS')}</span>
	          <span className={`bold ${style.text}`}>
	            {authUser.points === 0
	              ? '-'
	              : formatNumber(authUser.points, 2) || 0}{' '}
	            {getTranslation('POINTS')}
	          </span>
	        </div>
	        <a
	          id={`${page}-update-profile`}
	          className={`${style.button} ${style.inbite}`}
	          onClick={() => route('invite')}
	        >
	          {getTranslation('Invite Kakampinks +')}
	        </a>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(UserPoints);
