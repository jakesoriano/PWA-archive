import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, showTourGuide } from '_helpers';
import style from './style';
class HomeFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGuide: 0
    }
  }

    componentDidMount = () => {
      this.checkTourGuide();
    };

    componentDidUpdate = () => {
      this.checkTourGuide();
    };

    checkTourGuide = () => {
      if (this.state.activeGuide === 0 && this.props.tourGuide) {
        this.setState({
          activeGuide: 1
        });
      }
    }

    isItemActiveGuide = (item) => {
      return Boolean(this.state.activeGuide === item);
    };

    onNextGuide = () => {
      this.setState({
        activeGuide: this.state.activeGuide === 4 ? 0 : this.state.activeGuide + 1
      });
      if (this.state.activeGuide === 4) {
        showTourGuide(null);
      }
    };
    
    onClickItem = (url) => {
      if (this.state.activeGuide <= 0) {
        route(url);
      } else {
        this.onNextGuide();
      }
    }

	taskCompletedCount = () => {
	  const count = this.props?.tasks?.data?.reduce(
			(counter, { completed }) => (completed ? (counter += 1) : counter),
			0
		);
	  return count;
	};
    
    renderTooltip = (item,) => {
      if (this.isItemActiveGuide(item)) {
        return (
          <div className={style.tooltip}>
            <span className={style.arrow}></span>
            <p className={`bold ${style.title}`}>{getTranslation(`TOUR_GUIDE${item}_TITLE`)}</p>
            <p className={style.desc}>{getTranslation(`TOUR_GUIDE${item}_DESC`)}</p>
          </div>
        )
      }
      return null;
    }
    
    render = ({ members, tasks, page }, { activeGuide }) => (
      <div className={style.hfWrap}>
        <div className={style.body}>
          {/* Invite */}
          <a id={`${page}-invite`}
            onClick={(e) => {
              e.stopPropagation();
              this.onClickItem('/invite');
            }}
            className={`${style.item} ${this.isItemActiveGuide(1) ? style.activeGuide : ''}`}>
            <div className={style.iconWrap}>
              <ImageLoader
                src={'assets/images/image_members.png'}
                style={{ container: style.imageContainer, image: style.image }}
                lazy
              />
            </div>
            <p className={style.description}>{`${members?.data?.length} ${members?.data?.length === 1 ? getTranslation('MEMBER') : getTranslation('MEMBERS')}`}</p>
            <a className={`bold ${style.button}`}>{getTranslation('INVITE_OTHERS')}</a>
            {/* tooltip */}
            {this.renderTooltip(1)}
          </a>

          {/* Tasks */}
          <a id={`${page}-tasks`}
            onClick={(e) => {
              e.stopPropagation();
              this.onClickItem('/task-center');
            }}
            className={`${style.item} ${this.isItemActiveGuide(2) ? style.activeGuide : ''}`}>
            <div className={style.iconWrap}>
              <ImageLoader
                src={'assets/images/image_tasks.png'}
                style={{ container: style.imageContainer, image: style.image }}
                lazy
              />
            </div>
            <p className={`${style.description} lowercase`}>{`${tasks.data ? this.taskCompletedCount() + '/' + tasks?.data?.length : 0} ${getTranslation('COMPLETED')}`}</p>
            <a className={`bold ${style.button}`}>{getTranslation('DAILY_TASKS')}</a>
            {/* tooltip */}
            {this.renderTooltip(2)}
          </a>
                
          {/* Volunteer Kit */}
          <a id={`${page}-vol-kit`}
            onClick={(e) => {
              e.stopPropagation();
              this.onClickItem('/volunteer-kits');
            }}
            className={`${style.item} ${this.isItemActiveGuide(3) ? style.activeGuide : ''}`}>
            <div className={style.iconWrap}>
              <ImageLoader
                src={'assets/images/image_kits.png'}
                style={{ container: style.imageContainer, image: style.image }}
                lazy
              />
            </div>
            <p className={style.description}>{getTranslation('HF_VOLUNTEER_DESC')}</p>
            <a className={`bold ${style.button}`}>{getTranslation('VOLUNTEER_KIT')}</a>
            {/* tooltip */}
            {this.renderTooltip(3)}
          </a>

          {/* Community */}
          <a id={`${page}-community`}
            onClick={(e) => {
              e.stopPropagation();
              this.onClickItem('/community');
            }}
            className={`${style.item} ${this.isItemActiveGuide(4) ? style.activeGuide : ''}`}>
            <div className={style.iconWrap}>
              <ImageLoader
                src={'assets/images/image_communities.png'}
                style={{ container: style.imageContainer, image: style.image }}
                lazy
              />
            </div>
            <p className={style.description}>
              {getTranslation('HF_COMMUNITY_DESC')}</p>
            <a className={`bold ${style.button}`}>{getTranslation('JOIN_COMMUNITIES')}</a>
            {/* tooltip */}
            {this.renderTooltip(4)}
          </a>
        </div>
        {activeGuide > 0 && (
          <div className={style.overlay}
            onClick={(e) => {
              e.stopPropagation();
              this.onNextGuide();
            }}></div>
        )}
      </div>
    );
}
export default connect(['members', 'tasks', 'tourGuide'])(HomeFeatures);
