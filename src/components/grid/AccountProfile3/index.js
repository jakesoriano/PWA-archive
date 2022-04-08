import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader, UserAvatar } from '_components/core';
import { 
  fetchUserPoints
} from '_mutations';
import {
  getTranslation,
  formatNumber,
  displayName,
  formatRank
} from '_helpers';
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
				I've earned ${this.props.authUser.points} Hero Points. \n\n
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
	          <div className={style.avatar}>
	            <UserAvatar /> 
	          </div>
	          <div className={style.nameMember}>
	            <p className={`bold ${style.name}`}>{displayName(authUser.profile)}</p>
	            <div className={style.heroRankingContainer}>
	              <p className={`bold ${style.heroPoints}`}>{`${authUser.points === 0 ? '-' : formatNumber(authUser.points, 2) || 0}`} <span>{getTranslation('HERO_POINTS')}</span></p>
	            </div>
	          </div>
	          <a onClick={() => {
	            this.onShare();
	          }}
	          className={style.shareWrap}>
	            <ImageLoader 
	              src="assets/images/share_icon_white.png"
	              style={{ container: style.share }} />
	            {getTranslation('SHARE')}
	          </a>
	        </div>
	        <div className={style.heroRanking}>
	          <div className={style.rankBox}>
	            <p class={style.rankPointsText}>{getTranslation('REGIONAL')} <span class={`bold`}>{formatRank(authUser.rank.regional)}</span></p>
	          </div>
	          <div className={style.rankBox}>
	            <p class={style.rankPointsText}>{getTranslation('OVERALL')} <span class={`bold`}>{formatRank(authUser.rank.overall)}</span></p>
	          </div>
	        </div> 
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser', 'members'])(AccountProfile);
