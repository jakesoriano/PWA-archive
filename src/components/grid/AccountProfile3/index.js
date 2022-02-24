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
								<p className={`bold`}>{getTranslation('RANKING')}</p>
								<div className={style.heroRanking}>
									<div className={style.rankBox}>
										<p class={`extraBold ${style.rankPoints}`}>{formatRank(authUser.rank.regional)}</p>
										<p class={style.rankPointsText}>{getTranslation('REGIONAL')}</p>
									</div>
									<div className={style.rankBox}>
										<p class={`extraBold ${style.rankPoints}`}>{formatRank(authUser.rank.overall)}</p>
										<p class={style.rankPointsText}>{getTranslation('OVERALL')}</p>
									</div>
								</div>
							</div>
							<p className={`extraBold ${style.heroPoints}`}>{`${formatNumber(authUser.points, 2) || 0} ${getTranslation('HERO_POINTS')} `}</p>
						</div>
						<a onClick={() => {
							this.onShare();
						}}>
						<ImageLoader 
							src="assets/images/share_icon.png"
							style={{container: style.share}} />
						</a>
					</div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser', 'members'])(AccountProfile);
