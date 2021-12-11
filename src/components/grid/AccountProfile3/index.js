import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import { getTranslation, formatNumber, getDefaultAvatar } from '_helpers';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (authUser) {
	    // fetchUserPoints();
	  }
	};

	onShare = () => {
		nativeShare({
			title: `Be a Hero`,
			message: `\n
				I've earned ${this.props.authUser.point} Hero Points. \n\n
				Download the kakampink App, enter the referral code "${this.props.authUser.profile.refCode}" and let's show our support!\n\n
				#LetLeniLead
			`
		});
	}

	render = ({ authUser, members }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.accountProfile}>
	      <div className={style.profile}>
					<div className={style.user}>
						<ImageLoader 
							src={authUser.profile.image || getDefaultAvatar()}
							style={{container: style.avatar}} />
						<div className={style.nameMember}>
							<p className={`bold ${style.name}`}>{`${authUser.profile.fname} ${authUser.profile.lname}`}</p>
							<p className={style.members}>{`${getTranslation('RANK')} ${formatNumber(authUser.rank, 0) || 0}`}</p>
							<p className={style.members}>{`${formatNumber(authUser.points, 2) || 0} ${getTranslation('PTS')} `}</p>
						</div>
						<a onClick={() => {
							this.onShare();
						}}>
						<ImageLoader 
							src="assets/images/share_icon.png"
							style={{container: style.share}} />
						</a>
					</div>
					{/* Title */}
					<p className={`bold ${style.title}`}>{getTranslation('TOP_PERFORMERS')}</p>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser', 'members'])(AccountProfile);
