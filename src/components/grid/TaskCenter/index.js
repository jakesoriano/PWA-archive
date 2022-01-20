import { Component } from 'preact';
import { getTranslation, displayPageLoader } from '_helpers';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { ImageLoader } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TaskCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			posts: [
				"https://www.facebook.com/VPLeniRobredoPH/posts/492358148913293",
				"https://www.facebook.com/VPLeniRobredoPH/posts/491955892286852",
				"https://www.facebook.com/VPLeniRobredoPH/posts/492009615614813",
				"https://www.facebook.com/VPLeniRobredoPH/posts/491922975623477"
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
		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.taskCenterInstruction}>
					
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
					<div class="fb-post" data-href={this.state.posts[this.state.step]}></div>
			
				</div>
				
			</div>
		);
	};
}
export default connect(['signup'])(TaskCenter);
