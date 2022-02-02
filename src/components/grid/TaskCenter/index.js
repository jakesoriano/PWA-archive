import { Component } from 'preact';
import { updateStore } from '_unistore';
import { getTranslation, dateEventFormat, displayPageLoader, showAlertBox } from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader, ButtonDescription } from '_components/core';
import { fetchTasks, validateTask } from '_mutations';
import { nativeSigninFacebook } from '_platform/helpers';
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

		// get facebook access token
		nativeSigninFacebook() 
			.then(res => {
				if(res.success) {
					// validate / complete the task
					displayPageLoader(true);
					validateTask(this.state.item.id, res.data.token)
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
								success: true
							});
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
						} else if (status === 0) {
							showAlertBox({
								message: getTranslation('TASK_MSG_FAIL')
							});
						} else {
							showAlertBox({
								message: getTranslation('SOMETHING_WRONG')
							});
						}
					})
					.catch(err => {
						showAlertBox({
							message: getTranslation('SOMETHING_WRONG')
						});
					});
				} else if (res.error !== 'SIGN_IN_CANCELLED') {
					displayPageLoader(false);
					showAlertBox({
						message: getTranslation('ACCOUNT_NOT_FOUND')
					});
				}
			})
	};

	render = ({ tasks }, { item }) => {
		
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
						<p>{getTranslation('TASK_DEADLINE').replace('{DATE}', dateEventFormat(item.endDate))}</p>
						<p
							dangerouslySetInnerHTML={{
								__html: getTranslation('TASK_NOTE').replace(/link/gim, `<a href=${item.url}>link</a>`)
							}}
						/>
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
