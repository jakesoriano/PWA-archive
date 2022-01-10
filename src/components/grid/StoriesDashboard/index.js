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
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: null,
		}
	};

	componentDidMount = () => {
		fetchStories();
	};

	removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

	onClickStories = (data) => {
		this.setState({
			selectedItem: data
		});
	}

	onShare = (data) => {
		nativeShare({
			url: data.image,
			title: data.title,
			message: `A Kakampink Story!\n\n
				Title: ${data.title}\n
				Author: ${data.name}
			`
		});
	};

	renderDetails = (data) => {
		if (data) {
			return (
				<div className={style.pWrap}>
					<a className={`${style.pClose}`} onClick={() => {
						this.setState({
							selectedItem: null
						});
					}}>
						<ImageLoader
							src="assets/images/NOT_INTERESTED-pink.png"
							style={{container: style.closeBtn}}
						/>
					</a>
					<div className={`${style.pHeader}`}>
						<ImageLoader
								src={data.image}
								style={{container: style.pImage}} />
						<div className={style.pStory}>
							<p className={`extraBold ${style.pTitle}`}>{getTranslation(data.title)}</p>
						</div>
					</div>
					<p
						className={style.pContent}
						dangerouslySetInnerHTML={{
							__html: data.message
						}}
					/>
					{/* <a className={style.pShare} onClick={() => {
						this.onShare(data);
					}}>
						<ImageLoader
								src="assets/images/share_icon_white.png"
								style={{container: style.pIconShare}} />
							<span>{getTranslation('SHARE')}</span>
					</a> */}
				</div>
			)
		}
		return null;
	};

	render = ({ stories, authUser },{selectedItem}) => {
		
		if (!authUser) {
			return null;
		}

		return (
			<>
				<div className={style.storiesWrapper}>
					<div className={style.storiesHead}>
						<p className={` bold ${style.title}`}>{getTranslation('KAKAMPINK_STORIES')}</p>
					</div>
					<div className={style.storiesBody}>
						<div className={style.storiesWindow}>
							{stories.data.length > 0 ? (
								<div className={`${style.storiesWrap} ${style['i' + stories.data.length]}`}>
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
														<p className={`${style.detailTitle}`}>{i.title}</p>
														<p className={style.detailDescription}>{this.removeTags(i.message || '').substr(0, 100)} ...
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
							) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>}
						</div>
					</div>
				</div>
				{selectedItem && this.renderDetails(selectedItem)}
			</>
		);
	};
}
export default connect(['stories', 'authUser'])(StoriesDashboard);
