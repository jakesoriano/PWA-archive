/* eslint-disable no-else-return */
/* eslint-disable handle-callback-err */
/* eslint-disable react/no-unused-state */
import { Component } from 'preact';
import {
  getTranslation,
  dateEventFormat,
  displayPageLoader,
  showAlertBox,
  getConfigByKey,
} from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
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
	    // maintenance mode
	    const maintenance = getConfigByKey('maintenance') || [];
	    if (maintenance.indexOf('/tasks-center')) {
	      showAlertBox({
	        message: getTranslation('MAINTENANCE_DESC'),
	      });
	      return;
	    }
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

	topHash = () => {
	  const topText = getConfigByKey('taskTopText');
	  return (
	    <div className={style.topHash}>
	      <div className={style.info}>
	        {/* Info */}
	        <div className={style.infoTitle}>
	          <p>{topText || ''}</p>
	        </div>
	      </div>
	    </div>
	  );
	};

	bottomStatus = () => {
	  return (
	    <div className={style.bottomStatus}>
	      <div className={style.info}>
	        {/* Info */}
	        <div className={style.infoTitle}>
	          {this.taskCompletedCount() === 0 ? (
	            <p
	              dangerouslySetInnerHTML={{
	                __html: getTranslation('GUIDE_TASKS'),
	              }}
	            />
	          ) : (
	            <p
	              dangerouslySetInnerHTML={{
	                __html: `${getTranslation('COMPLETED_TASK').replace(
	                  '{num}',
										`${this.taskCompletedCount()}/${
											this.props?.tasks?.data?.length
										}`
	                )} ${
										!this.props?.tasks?.completed
										  ? getTranslation('CLICK_NEXT_TASK')
										  : ''
									}`,
	              }}
	            />
	          )}
	        </div>
	      </div>
	    </div>
	  );
	};

	taskCompletedShield = () => {
	  return (
	    <div>
	      <div className={style.taskShield}>
	        <div className={style.completedText}>
	          <p>
							You have completed{' '}
	            <span className={style.taskCompletedCount}>
	              {this.taskCompletedCount()}
	            </span>{' '}
							tasks
	          </p>
	        </div>
	        <ImageLoader
	          src={`assets/images/shield.png`}
	          style={{ container: style.imgCont }}
	        />
	      </div>
	    </div>
	  );
	};

	taskCompletedCount = () => {
	  const count = this.props?.tasks?.data?.reduce(
	    // eslint-disable-next-line no-param-reassign
	    (counter, { completed }) => (completed ? (counter += 1) : counter),
	    0
	  );
	  return count;
	};

	renderScreens = (tasks, item) => {
	  // no data available yet
	  if (!tasks.data || !item) {
	    return <p>{getTranslation('TASK_NODATA')}</p>;
	  } else if (tasks.completed) {
	    return (
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

	        {/* Go to leaderboards */}
	        {/* <p
	          onClick={() => route('leaderboard', true)}
	          className={style.redirect}
	        >
	          {getTranslation('VIEW_LEADERBOARD')}
	        </p> */}
	      </div>
	    );
	  } else {
	    return (
	      <div className={style.header}>
	        <div className={style.taskContainer}>
	          {/* <p>{getTranslation('TASK_INSTRUCTION')}</p> */}

	          {/* FB Post */}
	          {/* <div className={style.fbContainer}>
					<div class="fb-post" data-href={item.url}></div>
				</div> */}
	          {/* Image */}
	          <div className={style.taskBody}>
	            {this.state.item?.title && (
	              <p
	                className={style.title}
	                dangerouslySetInnerHTML={{
	                  __html: this.state.item.title,
	                }}
	              />
	            )}

	            <a
	              href={item.url}
	              target="_blank"
	              className={`task-fblink ${style.imageWrap}`}
	              onClick={this.handleDone}
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
	                onClick={this.handleDone}
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

	            {/* <div className={style.buttonContainer}>
							<ButtonDescription
								id="task-done"
								onClickCallback={this.handleDone}
								text="DONE"
								isDisabled={isDisabled}
							/>
						</div> */}
	          </div>
	          <div className={style.tasksToday}>
	            <p>
	              {getTranslation('TASKS_TODAY')}: {this.taskCompletedCount()}/
	              {tasks?.data?.length}
	            </p>
	          </div>
	        </div>
	      </div>
	    );
	  }
	};

	render = ({ tasks }, { item }) => {
	  return (
	    <div className={style.taskCenterWrapper}>
	      {tasks.data || item ? this.topHash() : null}
	      {tasks.data || item ? this.taskCompletedShield() : null}
	      <div className={tasks.data || item ? style.taskCenterBorder : ''}>
	        {this.renderScreens(tasks, item)}
	      </div>
	      {tasks.data || item ? this.bottomStatus() : null}
	    </div>
	  );
	};
}
export default connect(['tasks', 'authUser'])(TaskCenter);
