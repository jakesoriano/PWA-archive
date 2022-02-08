import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader, UserAvatar } from '_components/core';
import {
	getTranslation,
	formatNumber,
	getConfigByKey,
	circleModal,
	formatRank
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { updateStore } from '_unistore';
import { fetchUserPoints } from '_mutations';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class AccountProfile extends Component {
	componentDidMount = () => {
		const { authUser } = this.props;
		if (authUser) {
			fetchUserPoints();
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
				Android: ${getConfigByKey('playStore')}\n
				Use my invite code: ${this.props.authUser.profile.refCode}\n\n
				#LetLeniLead
			`,
		});
	};

	onDownloadKit = () => {
		window.open('http://Bit.ly/LabanLeni22', '_blank');
	};

	render = ({ authUser }) => {
		if (!authUser) {
			return <LoaderRing fullpage />;
		}

		return (
			<div className={style.accountProfile}>
				<div className={style.profile}>
					<div className={style.user}>
						<UserAvatar allowUpdate={true} />
						<div className={style.profileInfo}>
							<div className={style.nameMember}>
								<p
									className={`bold ${style.name}`}
								>{`${authUser.profile.fname} ${authUser.profile.lname}`}</p>
								<p className={`bold ${style.members}`}>{`${
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
							</div>
						</div>
						<div class={style.shareContainer}>
							<a
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
				</div>
				<a className={style.download} onClick={this.onDownloadKit}>
					<div>
						<ImageLoader
							src="assets/images/icon_download.png"
							style={{ container: style.iconDownload }}
						/>
						<span>{getTranslation('DOWNLOAD_KIT')}</span>
					</div>
				</a>
			</div>
		);
	};
}
export default connect(['authUser'])(AccountProfile);
