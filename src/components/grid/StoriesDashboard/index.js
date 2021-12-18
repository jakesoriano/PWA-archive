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
	getDefaultAvatar,
	circleModal
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import { updateStore } from '_unistore';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class StoriesDashboard extends Component {
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
      <div className={style.storiesWrapper}>
				<div className={style.storiesHead}>
					<p className={style.title}>{getTranslation('KAKAMPINK_STORIES')}</p>
				</div>
				<div className={style.storiesBody}>
					<div className={style.details} onClick={() => {}}>
						<ImageLoader
							src={this.props.authUser.profile.image}
							style={{container: style.detailImage}}
						/>
						<div className={style.detailContent}>
							<div className={style.detailHead}>
								<span className={style.userName}>Juan</span>
							</div>
							<div className={style.detailBody}>
								<p className={`bold ${style.detailTitle}`}>How I became a Kakam-Pink</p>
								<p className={style.detailDescription}>TextTextTextTextTextTextTextText</p>
							</div>
						</div>
					</div>
					<div className={style.buttons}>
						<a
							// className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
							className={''}
							// onClick={() => {
							// 	this.onLikeNews(i);
							// }}
							>
								<ImageLoader
								// src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
								src={'assets/images/fb-like-transparent.png'}
								style={{container: style.likeButton}}/>
								{getTranslation('LIKE')}
							</a>
					</div>
				</div>
			</div>
		);
	};
}
export default connect(['stories', 'authUser'])(StoriesDashboard);
