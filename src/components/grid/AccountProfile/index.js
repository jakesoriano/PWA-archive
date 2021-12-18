import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import { fetchUserData, fetchUserPoints } from '_mutations';
import {
	getTranslation,
	formatNumber,
	playStore,
	appStore,
	circleModal,
	getDefaultAvatar,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { updateStore } from '_unistore';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
	componentDidMount = () => {
		const { authUser } = this.props;
		if (authUser) {
			// fetchUserPoints();
			if (authUser.hasOwnProperty('isNewUser') && authUser.isNewUser) {
				circleModal({
					title: getTranslation('ITS_OFFICIAL'),
					content: getTranslation('YOURE_KAKAMPINK'),
					code: authUser.profile.refCode
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

	onShare = () => {
		nativeShare({
			title: `Be a Hero`,
			message: `\n
				I've earned ${this.props.authUser.points} Hero Points!\n
				Download the KakamPink App!\n\n
				Android: ${playStore}\n
				Apple: ${appStore}\n
				Use my invite code: ${this.props.authUser.profile.refCode}\n\n
				#LetLeniLead
			`,
		});
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
							src={authUser.profile.image || getDefaultAvatar()}
							style={{ container: style.avatar }}
						/>
						<div className={style.profileInfo}>
							<div className={style.nameMember}>
								<p
									className={`bold ${style.name}`}
								>{`${authUser.profile.fname} ${authUser.profile.lname}`}</p>
								<p className={style.members}>{`${
									formatNumber(authUser.members, 2) || 0
								} ${getTranslation('MEMBERS')}`}</p>
							</div>
							<div className={style.pointsRank}>
								<div className={style.heroPoints}>
									<p className={`extraBold ${style.points}`}>
										{formatNumber(authUser.points, 2) || 0}
									</p>
									<p className={`bold ${style.textPoints}`}>
										{getTranslation('HERO_POINTS')}
									</p>
								</div>
								<div className={style.heroRankingContainer}>
									<p>Ranking</p>
									<div className={style.heroRanking}>
										<div className={style.rankBox}>
											<p class={style.rankPoints}>{formatNumber(authUser.points, 2) || 0}</p>
											<p class={style.rankPointsText}>{getTranslation('REGIONAL')}</p>
										</div>
										<div className={style.rankBox}>
											<p class={style.rankPoints}>{formatNumber(authUser.points, 2) || 0}</p>
											<p class={style.rankPointsText}>{getTranslation('OVERALL')}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a
							className={style.shareContainer}
							onClick={() => {
								this.onShare();
							}}
						>
							<ImageLoader
								src="assets/images/share_icon.png"
								style={{ container: style.share }}
							/>
						</a>
					</div>
				</div>
				<Link className={style.download} href="http://Bit.ly/LabanLeni22" target="_blank">
					<div>
						<ImageLoader
							src="assets/images/icon_download.png"
							style={{ container: style.iconDownload }}
						/>
						<span>{getTranslation('DOWNLOAD_KIT')}</span>
					</div>
				</Link>
			</div>
		);
	};
}
export default connect(['authUser'])(AccountProfile);
