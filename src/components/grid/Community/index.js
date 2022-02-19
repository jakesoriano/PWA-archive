import { Component } from 'preact';
import { route } from 'preact-router';
import { store, updateStore } from '_unistore';
import { getTranslation, formatN } from '_helpers';
import {
  fetchCommunities,
  fetchEventsByCommunityId,
  fetchNewsByCommunity,
  filterCommunity,
  followCommunity,
  unFollowCommunity
} from '_mutations';
import { ImageLoader, ButtonDescription, LoaderRing } from '_components/core';
import { connect } from 'unistore/preact';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.communities.filter || '',
      moreFetching: false,
      sort: ['']
    }
    this.timer = null;
  }
	componentDidMount = () => {
    const { communities } = this.props;
    if (!communities.data.length) {
      fetchCommunities();
    }
		updateStore({
			customBack: () => {
				route(`community`, true);
			},
      communities: {
        ...communities,
        filter: ''
      }
		});
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
        filterCommunity(this.state.text, this.props.communities.sort, this.props.communities.page + 1);
      } else {
        console.log(this.props.communities, this.state.text)
        fetchCommunities(null, this.props.communities.page + 1);
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
        filterCommunity(e.target.value);
        this.setState({
          text: e.target.value
        })
      } else {
        fetchCommunities();
      }
    }, 500);
  }

  visitCommunity = (item) => {
    let { communityDetails } = store.getState();
    let details = item;
    updateStore({
      communityDetails: {
        ...communityDetails,
        details
      }
    });
    fetchEventsByCommunityId(item.id);
    fetchNewsByCommunity(item.id);
    route(`community-details`);
  }

  renderCommunities = () => {
    if (!this.props.communities.data.length) {
      return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
    }
    return this.props.communities.data.map((item, i) => (
      <div className={style.communityCard}>
        {item.image &&
        <div onClick={() => { this.visitCommunity(item) }}>
          <ImageLoader
            src={item.image}
            style={{container: style.imgCont, image: style.img}}
            lazy
          />
        </div>
        }
        <div className={style.cardBody}>
          <ButtonDescription
            id={item.followed ? 'community-unfollow' : 'community-follow'}
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
