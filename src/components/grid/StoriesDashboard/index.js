import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { fetchStories } from '_mutations';
import {
	getTranslation,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class StoriesDashboard extends Component {
	componentDidMount = () => {
		fetchStories();
	};

	onClickStories = (i) => {
		route(`/${this.props.parent}/story?id=${i.id}`);
	}

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

	render = ({ stories, authUser },{}) => {
		
		if (!authUser) {
			return null;
		}

		return (
      <div className={style.storiesWrapper}>
				<div className={style.storiesHead}>
					<p className={style.title}>{getTranslation('KAKAMPINK_STORIES')}</p>
				</div>
				<div className={style.storiesBody}>
					<div className={style.storiesWindow}>
						{stories.data.map((i) => (
							<div className={style.storyItem}>
								<div className={style.details} onClick={() => {
									this.onClickStories(i)
								}}>
									<ImageLoader
										src={i.image}
										style={{container: style.detailImage}}
									/>
									<div className={style.detailContent}>
										<div className={style.detailHead}>
											<span className={`extraBold ${style.userName}`}>{i.name}</span>
										</div>
										<div className={style.detailBody}>
											<p className={`bold ${style.detailTitle}`}>{i.title}</p>
											<p className={style.detailDescription}>{i.message.substr(0, 100)} 
												<span className='bold'> {`${i.message.length > 100 ? `${getTranslation('READ_ALL')}`: ''}`}</span>
											</p>
										</div>
									</div>
								</div>
								{/* <div className={style.buttons}>
									<a
										className={i.liked ? `extraBold ${style.buttonLikeActive}` : ''}
										onClick={() => {
											this.onLikeStory(i);
										}}
										>
											<ImageLoader
											src={!i.liked ? 'assets/images/fb-like-transparent.png' : 'assets/images/fb-like-transparent-dark.png'}
											style={{container: style.likeButton}}/>
											{getTranslation('LIKE')}
										</a>
								</div> */}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};
}
export default connect(['stories', 'authUser'])(StoriesDashboard);
