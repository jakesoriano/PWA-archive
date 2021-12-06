import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import { getTranslation, formatNumber } from '_helpers';
import { nativeShare } from '_platform/helpers';
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
							<p className={style.members}>{`${getTranslation('RANK')} ${formatNumber(authUser.rank, 0)}`}</p>
							<p className={style.members}>{`${formatNumber(authUser.points, 2)} ${getTranslation('PTS')} `}</p>
						</div>
						<a onClick={() => {
							nativeShare({
								message: `${getTranslation('RANK')}: ${formatNumber(authUser.rank, 0)}\n${getTranslation('HERO_POINTS')}: ${formatNumber(authUser.points, 2)}`
							})
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
export default connect(['authUser'])(AccountProfile);
