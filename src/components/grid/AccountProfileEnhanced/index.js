import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import {
  LoaderRing,
  ImageLoader,
  UserAvatar,
  ReportButtons,
} from '_components/core';
import {
  getTranslation,
  formatNumber,
  getConfigByKey,
  circleModal,
  displayName,
  showAlertBox,
  componentModal,
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

	onReportClicked = () => {
	  componentModal({
	    content: <ReportButtons />,
	    transparentBG: true,
	  });
	};

	render = ({ authUser, page }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.accountProfile}>
	      <div className={style.profile}>
	        <div className={style.user}>
	          <UserAvatar allowUpdate styles={{ avatar: style.avatar }} />
	          <div className={style.profileInfo}>
	            <div className={style.nameMember}>
	              <p className={`bold ${style.name}`}>
	                {displayName(authUser.profile)}
	              </p>
	            </div>
	            <div className={style.pointsRank}>
	              <div className={style.heroPoints}>
	                <p>
	                  <span className={`bold ${style.points}`}>
	                    {authUser.points === 0
	                      ? '-'
	                      : formatNumber(authUser.points, 2) || 0}
	                  </span>
										&nbsp;
	                  <span className={`bold ${style.textPoints}`}>
	                    {getTranslation('HERO_POINTS')}
	                  </span>
	                </p>
	                <p className={style.invite}>
	                  <span className="bold">
	                    {getTranslation('INVITE_OTHERS_USING')}:
	                  </span>
	                  <div
	                    id={`copy-referral-code`}
	                    className={`${style.refCode}`}
	                    onClick={() => this.copyText(authUser?.profile?.refCode)}
	                  >
	                    <span className={`bold`}>
	                      {authUser?.profile?.refCode}
	                    </span>
	                    <ImageLoader
	                      src={'assets/icons/icon_copy_blue.png'}
	                      style={{ container: style.copy }}
	                    />
	                  </div>
	                </p>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div className={style.cta}>
	        <a
	          id={`${page}-report`}
	          className={`bold ${style.button} ${style.report}`}
	          onClick={this.onReportClicked}
	        >
	          {getTranslation('REPORT')}
	        </a>
	        <a
	          id={`${page}-update-profile`}
	          className={`bold ${style.button} ${style.update}`}
	          onClick={() => route('update-profile')}
	        >
	          {getTranslation('UPDATE_PROFILE')}
	        </a>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(AccountProfile);
