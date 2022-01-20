import { Component } from 'preact';
import { getTranslation, dateEventFormat, displayPageLoader } from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TaskCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			posts: [
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
		};
	};

	componentDidMount = () => {
		try {
			FB.XFBML.parse();
		} catch(err) {}
	};
	
	handleStep = (index) => {
		if (this.state.active !== index) {
			this.setState({ step: index }, () => {
				FB.XFBML.parse();
			});
		};
	};

	render = () => {

		const currentPost = this.state.posts[this.state.step];

		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.header}>
					
					<p>{getTranslation('TASK_INSTRUCTION')}</p>

					<div className={style.steps}>
						{this.state.posts.map((item, index) => {
							return (
								<button onClick={() => {
									this.handleStep(index);
								}}>
									<ImageLoader
										src={`assets/images/step-${index <= this.state.step ? 'active' : 'inactive'}.png`}
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
						<p>Like VP FB Post for {currentPost.points}pts</p>
						<p>Deadline: {dateEventFormat(currentPost.expDate)}</p>
						<p>Note: Lofin to Facebook if you cannot see the post</p>
					</div>
				</div>
			</div>
		);
	};
}
export default connect(['signup'])(TaskCenter);
