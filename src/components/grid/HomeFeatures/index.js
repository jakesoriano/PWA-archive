import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
class HomeFeatures extends Component {
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
                {/* Invite */}
                <Link href='/invite' className={style.item}>
                    <div className={style.iconWrap}>
                        <ImageLoader
                            src={'assets/images/image_members.png'}
                            style={{container: style.imageContainer, image: style.image}}
                            lazy
                        />
                    </div>
                    <p className={style.description}>{`${members?.data?.length} ${members?.data?.length === 1 ? getTranslation('MEMBER') : getTranslation('MEMBERS')}`}</p>
                    <a className={`bold ${style.button}`}>{getTranslation('INVITE_OTHERS')}</a>
                </Link>
                {/* Tasks */}
                <Link href='/task-center' className={style.item}>
                    <div className={style.iconWrap}>
                        <ImageLoader
                            src={'assets/images/image_tasks.png'}
                            style={{container: style.imageContainer, image: style.image}}
                            lazy
                        />
                    </div>
                    <p className={`${style.description} lowercase`}>{`${tasks.data ? this.taskCompletedCount() + '/' + tasks?.data?.length : 0} ${getTranslation('COMPLETED')}`}</p>
                    <a className={`bold ${style.button}`}>{getTranslation('DAILY_TASKS')}</a>
                </Link>
                {/* Volunteer Kit */}
                <Link href='/volunteer-kits' className={style.item}>
                    <div className={style.iconWrap}>
                        <ImageLoader
                            src={'assets/images/image_kits.png'}
                            style={{container: style.imageContainer, image: style.image}}
                            lazy
                        />
                    </div>
                    <p className={style.description}>{getTranslation('HF_VOLUNTEER_DESC')}</p>
                    <a className={`bold ${style.button}`}>{getTranslation('VOLUNTEER_KIT')}</a>
                </Link>
                {/* Community */}
                <Link href='/community' className={style.item}>
                    <div className={style.iconWrap}>
                        <ImageLoader
                            src={'assets/images/image_communities.png'}
                            style={{container: style.imageContainer, image: style.image}}
                            lazy
                        />
                    </div>
                    <p className={style.description}>
                        {getTranslation('HF_COMMUNITY_DESC')}</p>
                    <a className={`bold ${style.button}`}>{getTranslation('JOIN_COMMUNITIES')}</a>
                </Link>
            </div>
        </div>
    );
}
export default connect(['members', 'tasks'])(HomeFeatures);