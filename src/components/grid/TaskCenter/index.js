import { Component } from 'preact';
import { getTranslation, dateEventFormat, displayPageLoader } from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader, ButtonDescription } from '_components/core';
import { fetchTasks, doneTask } from '_mutations';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TaskCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: null
		};
	};

	componentDidMount = () => {
		fetchTasks();
		this.setData();
	};

	componentDidUpdate = () => {
		this.setData();
	};

	setData = () => {
		try {
			if (!this.state.item && this.props.tasks.data) {
				this.setState({
          item: this.props.tasks.data.reduce((result, item) => {
            if (!result || (!item.completed && result.completed)) {
              return item;
						}
            return result;
          }, null)
				}, () => {
					FB.XFBML.parse();
				});
			}
		} catch (err) {}
	}
	
	handleDone = () => {
		displayPageLoader(true);
		doneTask(this.state.item.id)
			.then(() => {
				displayPageLoader(false);
				this.setState({
					item: this.props.tasks.data.reduce((result, item) => {
						if (!result || (!item.completed && result.completed)) {
							return item;
						}
						return result;
					}, null)
				}, () => {
					FB.XFBML.parse();
				});
			});
	};

	render = ({ tasks }, { item }) => {
		
		// no data available yet
		if (!tasks.data || !item) {
			return (
				<div className={style.taskCenterWrapper}>
				</div>
			);
		}

		// tasks completed
		if (tasks.completed) {
			return (
				<div className={style.taskCenterWrapper}>
					<p>{getTranslation('TASK_COMPLETED')}</p>
				</div>
			);
		}

		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.header}>
					
					<p>{getTranslation('TASK_INSTRUCTION')}</p>

					<div className={style.steps}>
						{tasks.data.map(item => {
							return (
								<button>
									<ImageLoader
										src={`assets/images/step-${item.completed ? 'active' : 'inactive'}.png`}
										style={{container: style.imgWrap}}
									/>
								</button>
							)
						})}
					</div>

					{/* FB Post */}
					<div className={style.fbContainer}>
						<div class="fb-post" data-href={item.url}></div>
					</div>

					{/* Footer */}
					<div className={style.footer}>
						<p>{getTranslation('TASK_POINTS').replace('{POINTS}', item.points)}</p>
						<p>{getTranslation('TASK_DEADLINE').replace('{DATE}', dateEventFormat(item.expDate))}</p>
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
export default connect(['tasks'])(TaskCenter);
