import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader, UserAvatar } from '_components/core';
import { fetchUserPoints } from '_mutations';
import { getTranslation, formatNumber, displayName } from '_helpers';
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

	render = ({ authUser }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.accountProfile}>
	      <div className={style.profile}>
					<div className={style.user}>
						<UserAvatar /> 
						<div className={style.nameMember}>
							<p className={`bold ${style.name}`}>{displayName(authUser.profile)}</p>
							<p className={style.members}>{`${formatNumber(authUser.members, 2) || 0} ${getTranslation('MEMBERS')}`}</p>
						</div>
					</div>
					<div className={style.pointsNbuttons}>
						<p className={style.heroPoints}>
							<span className={`extraBold ${style.points}`}>{formatNumber(authUser.points, 2) || 0}</span>
							<span className={`bold ${style.textPoints}`}>{getTranslation('HERO_POINTS')}</span>
						</p>
						<Link id="update-profile" className={style.updateProfile} href={`/${this.props.parent}/update-profile`}>
							<div>
								<span className='bold'>{getTranslation('UPDATE_PROFILE')}</span>
							</div>
						</Link>
						<Link className={style.invite} href="/invite">
							<div>
								<ImageLoader
									src="assets/images/invite_icon.png"
									style={{container: style.iconInvite}} />
							</div>
						</Link>
						{/* <Link className={style.invite}>
							<div>
								<ImageLoader
									src="assets/images/chat_icon.png"
									style={{container: style.iconChat}} />
							</div>
						</Link> */}
					</div>
	      </div>
				
	    </div>
	  );
	};
}
export default connect(['authUser'])(AccountProfile);
