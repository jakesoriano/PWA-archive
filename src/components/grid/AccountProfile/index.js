import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
	componentDidMount = () => {
	  const { authUser } = this.props;
	  if (!authUser) {
	    fetchUserData();
	  } else if (authUser) {
	    fetchUserPoints();
	  }
	};

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
							<p className={style.members}>{`${authUser.members} ${getTranslation('MEMBERS')}`}</p>
						</div>
						<ImageLoader 
							src="assets/images/share_icon.png"
							style={{container: style.share}} />
					</div>
	        <p className={style.heroPoints}>
	          <span className={`extraBold ${style.points}`}>{authUser.points}</span>
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
