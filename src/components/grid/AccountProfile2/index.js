import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader, UserAvatar } from '_components/core';
import { fetchUserPoints } from '_mutations';
import { getTranslation, formatNumber } from '_helpers';
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
						<UserAvatar allowUpdate={false} /> 
						<div className={style.nameMember}>
							<p className={`bold ${style.name}`}>{`${authUser.profile.fname} ${authUser.profile.lname}`}</p>
							<p className={style.members}>{`${formatNumber(authUser.members, 2) || 0} ${getTranslation('MEMBERS')}`}</p>
						</div>
					</div>
					<div className={style.pointsNbuttons}>
						<p className={style.heroPoints}>
							<span className={`extraBold ${style.points}`}>{formatNumber(authUser.points, 2) || 0}</span>
							<span className={`bold ${style.textPoints}`}>{getTranslation('HERO_POINTS')}</span>
						</p>
						<Link className={style.invite} href="/invite">
							<div>
								<ImageLoader
									src="assets/images/invite_icon.png"
									style={{container: style.iconInvite}} />
								<span>{getTranslation('INVITE_MORE')}</span>
							</div>
						</Link>
					</div>
	      </div>
				
	    </div>
	  );
	};
}
export default connect(['authUser'])(AccountProfile);
