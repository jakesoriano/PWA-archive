import { Component } from 'preact';
import { getTranslation, dateEventFormat, displayPageLoader } from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader, ButtonDescription } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TaskCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			posts: null,
			complete: false
		};
	};

	componentDidMount = () => {
		try {
			this.setState({
				active: 0,
				posts : [
					{
						url: "https://www.facebook.com/VPLeniRobredoPH/posts/492358148913293",
						points: 10,
						expDate: '2022-02-08',
					},
					{
						url: "https://www.facebook.com/VPLeniRobredoPH/posts/491955892286852",
						points: 10,
						expDate: '2022-02-08',
					},
					{
						url: "https://www.facebook.com/VPLeniRobredoPH/posts/492009615614813",
						points: 10,
						expDate: '2022-02-08',
					},
					{
						url: "https://www.facebook.com/VPLeniRobredoPH/posts/491922975623477",
						points: 10,
						expDate: '2022-02-08',
					}
				]
			}, () => {
				FB.XFBML.parse();
			})
		} catch(err) {}
	};
	
	handleDone = () => {
		// go to next task
		if (this.state.active < this.state.posts.length) {
			displayPageLoader(true);

			setTimeout(() => {
				displayPageLoader(false);
				// update active item or completed
				if ((this.state.active + 1) === this.state.posts.length) {
					this.setState({ completed: true });
				} else {
					this.setState({ active: this.state.active + 1 }, () => {
						FB.XFBML.parse();
					});
				}
			}, 1000)
		}
	};

	render = (props, { active, posts, completed}) => {

		// no data available yet
		if (!posts) {
			return null;
		}

		// tasks completed
		if (completed) {
			return (
				<div className={style.taskCenterWrapper}>
					<p>{getTranslation('TASK_COMPLETED')}</p>
				</div>
			);
		}


		const currentPost = posts[active];
		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.header}>
					
					<p>{getTranslation('TASK_INSTRUCTION')}</p>

					<div className={style.steps}>
						{posts.map((item, index) => {
							return (
								<button>
									<ImageLoader
										src={`assets/images/step-${index <= active ? 'active' : 'inactive'}.png`}
										style={{container: style.imgWrap}}
									/>
								</button>
							)
						})}
					</div>

					{/* FB Post */}
					<div className={style.fbContainer}>
						<div class="fb-post" data-href={currentPost.url}></div>
					</div>

					{/* Footer */}
					<div className={style.footer}>
						<p>{getTranslation('TASK_POINTS').replace('{POINTS}', currentPost.points)}</p>
						<p>{getTranslation('TASK_DEADLINE').replace('{DATE}', dateEventFormat(currentPost.expDate))}</p>
						<p>{getTranslation('TASK_NOTE')}</p>
					</div>
				</div>

				<div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={this.handleDone}
	          text="DONE"
	        />
	      </div>
			</div>
		);
	};
}
export default connect(['signup'])(TaskCenter);
