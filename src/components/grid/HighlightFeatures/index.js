import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
class HighlightFeatures extends Component {
	taskCompletedCount = () => {
		const count = this.props?.tasks?.data?.reduce(
			(counter, { completed }) => (completed ? (counter += 1) : counter),
			0
		);
		return count;
	};
    render = ({members, tasks}) => (
        <div className={style.hfWrap}>
            <div className={style.body}>
                <div className={style.item}>
                    <ImageLoader
                        src={'assets/images/image_members.png'}
                        style={{container: style.imageContainer, image: style.image}}
                        lazy
                    />
                    <p className={style.description}>{`${members?.data?.length} ${members?.data?.length === 1 ? getTranslation('MEMBER') : getTranslation('MEMBERS')}`}</p>
                    <a
                        className={`bold ${style.button}`}
                        onClick={() => route('invite')}
                    >{getTranslation('INVITE_OTHERS')}</a>
                </div>
                <div className={style.item}>
                    <ImageLoader
                        src={'assets/images/image_tasks.png'}
                        style={{container: style.imageContainer, image: style.image}}
                        lazy
                    />
                    <p className={`${style.description} lowercase`}>{`${tasks.data ? this.taskCompletedCount() + '/' + tasks?.data?.length : 0} ${getTranslation('COMPLETED')}`}</p>
                    <a
                        className={`bold ${style.button}`}
                        onClick={() => route('task-center')}
                    >{getTranslation('DAILY_TASKS')}</a>
                </div>
                <div className={style.item}>
                    <ImageLoader
                        src={'assets/images/image_kits.png'}
                        style={{container: style.imageContainer, image: style.image}}
                        lazy
                    />
                    <p className={style.description}>{getTranslation('HF_VOLUNTEER_DESC')}</p>
                    <a
                        className={`bold ${style.button}`}
                        onClick={() => route('volunteer-kits')}
                    >{getTranslation('VOLUNTEER_KIT')}</a>
                </div>
                <div className={style.item}>
                    <ImageLoader
                        src={'assets/images/image_communities.png'}
                        style={{container: style.imageContainer, image: style.image}}
                        lazy
                    />
                    <p className={style.description}>
                        {getTranslation('HF_COMMUNITY_DESC')}</p>
                    <a
                        className={`bold ${style.button}`}
                        onClick={() => route('community')}
                    >{getTranslation('JOIN_COMMUNITIES')}</a>
                </div>
            </div>
        </div>
    );
}
export default connect(['members', 'tasks'])(HighlightFeatures);