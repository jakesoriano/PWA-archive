import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import {
	getTranslation,
	formatNumber,
	playStore,
	appStore,
	getDefaultAvatar,
	circleModal
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
						<ImageLoader
							src={authUser.profile.image || getDefaultAvatar()}
							style={{ container: style.avatar }}
						/>
						<div className={style.nameMember}>
							<p
								className={`bold ${style.name}`}
							>{`${authUser.profile.fname} ${authUser.profile.lname}`}</p>
							<p className={style.members}>{`${
								formatNumber(authUser.members, 2) || 0
							} ${getTranslation('MEMBERS')}`}</p>
						</div>
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
					<p className={style.heroPoints}>
						<span className={`extraBold ${style.points}`}>
							{formatNumber(authUser.points, 2) || 0}
						</span>
						<span className={`bold ${style.textPoints}`}>
							{getTranslation('HERO_POINTS')}
						</span>
					</p>
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
