import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import { getTranslation, formatNumber, playStore, appStore } from '_helpers';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (authUser) {
	    fetchUserPoints();
	  }
	};

	onShare = () => {
		nativeShare({
			title: `Be a Hero`,
			message: `\n
				I've earned ${this.props.authUser.points} Hero Points!\n
				Download the KakamPink App!\n\n
				Android: ${playStore}\n
				Apple: ${appStore}\n
				Use my invite code: ${this.props.authUser.refCode}\n\n
				#LetLeniLead
			`
		});
	}

	render = ({ authUser }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.accountProfile}>
	      <div className={style.profile}>
					<div className={style.user}>
						<ImageLoader 
							src={authUser.image}
							style={{container: style.avatar}} />
						<div className={style.nameMember}>
							<p className={`bold ${style.name}`}>{`${authUser.fname} ${authUser.lname}`}</p>
							<p className={style.members}>{`${formatNumber(authUser.members, 2)} ${getTranslation('MEMBERS')}`}</p>
						</div>
						<a onClick={() => {
							this.onShare();
						}}>
							<ImageLoader 
								src="assets/images/share_icon.png"
								style={{container: style.share}} />
						</a>
					</div>
	        <p className={style.heroPoints}>
	          <span className={`extraBold ${style.points}`}>{formatNumber(authUser.points, 2)}</span>
	          <span className={`bold ${style.textPoints}`}>{getTranslation('HERO_POINTS')}</span>
	        </p>
	      </div>
				<Link className={style.invite} href="/invite">
					<div>
						<ImageLoader
							src="assets/images/invite_icon.png"
							style={{container: style.iconInvite}} />
						<span>{getTranslation('INVITE_MEMBER')}</span>
					</div>
					<span>{getTranslation('EARN_100P')}</span>
				</Link>
	    </div>
	  );
	};
}
export default connect(['authUser'])(AccountProfile);
