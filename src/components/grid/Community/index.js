import { Component } from 'preact';
import { route } from 'preact-router';
import { store, updateStore } from '_unistore';
import { getTranslation, formatN } from '_helpers';
import {
  fetchCommunities,
  filterCommunity,
  followCommunity,
  unFollowCommunity
} from '_mutations';
import { ImageLoader, ButtonDescription, LoaderRing } from '_components/core';
import { connect } from 'unistore/preact';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Community extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      moreFetching: false
    }
    this.timer = null;
  }
	componentDidMount = () => {
    const { communities } = this.props;
    if (!communities.data.length) {
      fetchCommunities(this.props.communities.page);
    }
	};

  componentDidUpdate = () => {
    if (this.state.moreFetching && !this.props.communities.fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }

  handleShowMore = () => {
    if (!this.state.moreFetching) {
      // flag
      this.setState({
        moreFetching: true
      });
      // fetch
      if (this.state.text) {
        filterCommunity(this.state.text, this.props.communities.page + 1);
      } else {
        fetchCommunities(this.props.communities.page + 1);
      }
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
        filterCommunity(e.target.value, 1);
        this.setState({
          text: e.target.value
        })
      } else {
        fetchCommunities();
      }
    }, 500);
  }

  visitCommunity = (id) => {
    let { communityDetails } = store.getState();
    updateStore({
      communityDetails: {
        ...communityDetails,
        id: id
      }
    });
    route(`/${this.props.parent}/community-details`);
  }

  renderCommunities = () => {
    if (!this.props.communities.data.length) {
      return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
    }
    return this.props.communities.data.map((item, i) => (
      <div className={style.communityCard}>
        {item.image &&
        <ImageLoader
          onClick={this.visitCommunity(item.id)}
          src={item.image}
          style={{container: style.imgCont, image: style.img}}
          lazy
        />
        }
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

	render = ({ communities }) => {
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
          {/* show more */}
          {communities.data.length < communities.total && !communities.fetching && (
            <button className={style.showMore} onClick={this.handleShowMore}>
              <span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
            </button>
          )}
          {/* loader */}
          {this.state.moreFetching && (
            <LoaderRing styles={{container: style.loaderWrap}}/>
          )}
        </div>

			</div>
	  );
	};
}
export default connect(['communities'])(Community);
