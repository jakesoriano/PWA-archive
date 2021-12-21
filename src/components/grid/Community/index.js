import { Component } from 'preact';
import { getTranslation, formatN } from '_helpers';
import {
  fetchCommunities,
  filterCommunity,
  followCommunity,
  unFollowCommunity
} from '_mutations';
import { ImageLoader, ButtonDescription } from '_components/core';
import { connect } from 'unistore/preact';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Community extends Component {
  constructor() {
    super();
    this.timer = null;
  }
	componentDidMount = () => {
    const { communities } = this.props;
    if (!communities.data.length) {
      fetchCommunities();
    }
	};

  handleFollow = (item) => {
    if (item.followed) {
      unFollowCommunity(item);
    } else {
      followCommunity(item);
    }
  }

  handleSearchByName = (e) => {
    // filter
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (e.target.value) {
        filterCommunity(e.target.value);
      } else {
        fetchCommunities();
      }
    }, 500);
  }

  visitCommunity = (id) => {
  }

  renderCommunities = () => {
    if (!this.props.communities.data.length) {
      return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
    }
    return this.props.communities.data.map((item, i) => (
      <div className={style.communityCard}>
        <div className={style.img}>
          {item.image &&
          <ImageLoader
            onClick={this.visitCommunity(item.id)}
            src={item.image}
            style={{container: style.img}}
          />
          }
        </div>
        <div className={style.cardBody}>
          <ButtonDescription
            onClickCallback={(e) => { this.handleFollow(item)}}
            text={getTranslation(item.followed ? 'UNFOLLOW' : 'FOLLOW')}
            bottomDescription={item.name}
            buttonStyle={`${style.buttonStyle} ${item.followed ? style.followed : ''}`}
            bottomDescStyle={style.bottomDescStyle}
            active={this.props.communities.data[i].followed}
          />
          {item.followers > 0 && <p className={style.followers}>{formatN(item.followers, 2)} kakam-PINK</p>}
        </div>
      </div>
      ))
  }

	render = () => {
	  return (
	    <div className={style.communityWrapper}>
        <div className={style.search}>
          <input
            name="communitySearch"
            placeholder="Search a Community"
            onInput={this.handleSearchByName}
          />
          <ImageLoader
            src={'assets/images/magnifying_icon.png'}
            style={{container: style.searchIcon}}
          />
        </div>
        <div className={style.communityBody}>
          <p className={`${style.title} bold`}>{getTranslation('FOLLOW_COMMUNITIES')}</p>
          <div className={style.communities}>
            { this.renderCommunities() }
          </div>
        </div>
			</div>
	  );
	};
}
export default connect(['communities'])(Community);
