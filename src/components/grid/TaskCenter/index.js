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
			task: null,
		};
	};

	componentDidMount = () => {
	};

	render = () => {
		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.taskCenterInstruction}>
					
					<p>{getTranslation('TASK_INSTRUCTION')}</p>

					<div className={style.taskContainer}>
						<ul className={style.progressbar}>
							<li className={style.active}>
								<ImageLoader
									src={'assets/images/step-active.png'}
									style={{container: style.step}}
								/>
							</li>
							<li>
								<ImageLoader
									src={'assets/images/step-inactive.png'}
									style={{container: style.step}}
								/>
							</li>
							<li>
								<ImageLoader
									src={'assets/images/step-inactive.png'}
									style={{container: style.step}}
								/>
							</li>
							<li>
								<ImageLoader
									src={'assets/images/step-inactive.png'}
									style={{container: style.step}}
								/>
							</li>
						</ul>
					</div>
			
				</div>
				
			</div>
		);
	};
}
export default connect(['signup'])(TaskCenter);
