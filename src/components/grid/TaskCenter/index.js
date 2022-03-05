/* eslint-disable handle-callback-err */
/* eslint-disable react/no-unused-state */
/* eslint-disable indent */
import { Component } from 'preact';
import {
	getTranslation,
	dateEventFormat,
	displayPageLoader,
	showAlertBox,
} from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader, ButtonDescription } from '_components/core';
import { fetchTasks, validateTask } from '_mutations';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TaskCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: null,
			isDisabled: true,
		};
	}

	componentDidMount = () => {
		fetchTasks();
		this.setData();
	};

	componentDidUpdate = () => {
		this.setData();
	};

	enableButton = () => {
		this.setState({
			isDisabled: false,
		});
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
					}, null),
					// }, () => {
					// 	FB.XFBML.parse();
				});
			}
		} catch (err) {}
	};

	handleDone = () => {
		try {
			validateTask(this.state.item.id)
				.then((status) => {
					/**
					 * 1 = success
					 * 0 = not liked
					 * -1 = server error
					 */
					displayPageLoader(false);
					if (status === 1) {
						showAlertBox({
							message: getTranslation('TASK_MSG_SUCCESS'),
							success: true,
						});
						this.setState({
							isDisabled: true,
							item: this.props.tasks.data.reduce((result, item) => {
								if (!result || (!item.completed && result.completed)) {
									return item;
								}
								return result;
							}, null),
							// }, () => {
							// 	FB.XFBML.parse();
						});
					} else if (status === 0) {
						showAlertBox({
							message: getTranslation('TASK_MSG_FAIL'),
						});
					} else {
						showAlertBox({
							message: getTranslation('SOMETHING_WRONG'),
						});
					}
				})
				// eslint-disable-next-line no-unused-vars
				.catch((err) => {
					displayPageLoader(false);
					showAlertBox({
						message: getTranslation('SOMETHING_WRONG'),
					});
				});
		} catch (error) {
			showAlertBox({
				message: getTranslation('SOMETHING_WRONG'),
			});
		}
	};

	taskCompletedCount = () => {
		const count = this.props?.tasks?.data?.reduce(
			// eslint-disable-next-line no-param-reassign
			(counter, { completed }) => (completed ? (counter += 1) : counter),
			0
		);
		return count;
	};

	render = ({ tasks }, { item, isDisabled }) => {
		// no data available yet
		if (!tasks.data || !item) {
			return (
				<div className={style.taskCenterWrapper}>
					<p>{getTranslation('TASK_NODATA')}</p>
				</div>
			);
		}

		// tasks completed
		if (tasks.completed) {
			return (
				<div className={style.taskCenterWrapper}>
					<div className={style.taskContainerCompleted}>
						<div>
							<p className={style.titleCompleted}>
								{getTranslation('SALAMAT_KAKAMPINK_TASK')}
							</p>
							<p className={style.subTitleCompleted}>
								{getTranslation('BALIK_TASK')}
							</p>
						</div>

						<div className={style.taskCompletedCount}>
							<div>
								<p>{getTranslation('TOTAL_COMPLETED')}</p>
								<p className={style.taskCount}>
									{/* eslint-disable-next-line react/jsx-one-expression-per-line */}
									{tasks?.data?.length}/{tasks?.data?.length}
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={style.taskCenterWrapper}>
				<div className={style.header}>
					<div className={style.taskContainer}>
						{/* <p>{getTranslation('TASK_INSTRUCTION')}</p> */}
						<div className={style.taskCompleted}>
							<p className={style.taskCount}>{this.taskCompletedCount()}</p>
							<p className={style.taskComplete}>
								{this.taskCompletedCount() > 1
									? `${getTranslation('TASKS')}`
									: `${getTranslation('TASK')}`}{' '}
								{getTranslation('COMPLETED')}
							</p>
						</div>
						<div
							className={`${style.steps} ${
								tasks.data.length === 1 ? style.hasOneItem : ''
							}`}
						>
							{tasks.data.map((item) => {
								return (
									<>
										<button>
											<ImageLoader
												src={`assets/images/step-${
													item.completed ? 'active' : 'inactive'
												}.png`}
												style={{ container: style.imgWrap }}
											/>
										</button>
									</>
								);
							})}
						</div>
						{tasks?.data[this.taskCompletedCount()]?.title && (
							<div className={style.taskTitle}>
								<p
									dangerouslySetInnerHTML={{
										__html: tasks?.data[this.taskCompletedCount()]?.title || '',
									}}
								/>
							</div>
						)}

						{/* FB Post */}
						{/* <div className={style.fbContainer}>
						<div class="fb-post" data-href={item.url}></div>
					</div> */}
						{/* Image */}
						<a
							href={item.url}
							target="_blank"
							className={`task-fblink ${style.imageWrap}`}
							onClick={this.enableButton}
							rel="noopener noreferrer"
						>
							<ImageLoader
								src={item.image}
								style={{ container: style.featuredImage }}
							/>
						</a>
						{/* Footer */}
						<div className={style.footer}>
							<a
								className="task-fblink"
								href={item.url}
								target="_blank"
								onClick={this.enableButton}
								rel="noopener noreferrer"
							>
								{item.url}
							</a>
							<p>
								{getTranslation('TASK_DEADLINE').replace(
									'{DATE}',
									dateEventFormat(item.endDate)
								)}
							</p>
							<p>{item.instruction}</p>
						</div>

						<div className={style.buttonContainer}>
							<ButtonDescription
								id="task-done"
								onClickCallback={this.handleDone}
								text="DONE"
								isDisabled={isDisabled}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};
}
export default connect(['tasks'])(TaskCenter);
