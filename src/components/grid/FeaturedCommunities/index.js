import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { store, updateStore } from '_unistore';
import { ImageLoader, ButtonDescription, LoaderRing } from '_components/core';
import { getTranslation, getDefaultAvatar, formatN } from '_helpers';
import { followCommunity, unFollowCommunity, fetchCommunities, fetchEventsByCommunityId } from '_mutations';
import style from './style';

class FeaturedCommunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comms: []
    }
  }

  componentDidMount = () => {
    if (this.props.top > 1) {
      fetchCommunities();
    }
  }

  handleFollow = (item) => {
    if (item.followed) {
      unFollowCommunity(item);
    } else {
      followCommunity(item);
    }
  };

  handleShowAll = () => {
    route(`community-list`);
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
    route(`community-details`);
  }

  renderItem = (item) => {
    return (
      <div className={style.communityDetailsWrap}>
        <div onClick={() => { this.visitCommunity(item) }}>
          <ImageLoader
            src={item.image || getDefaultAvatar()}
            style={{ container: style.avatar }}
            lazy
          />
        </div>
        <div className={style.content}>
          <p class={`${style.heading} extraBold`}>{item.name}</p>
          <p className={style.followers}>{formatN(item.followers, 2) || 0} kakam-PINK</p>
          {item.desc && <p className={style.desc}>{item.desc}</p>}
        </div>
        <div class={style.buttonContainer}>
          <ButtonDescription
            id={item.followed ? 'community-unfollow' : 'community-follow'}
            onClickCallback={(e) => { this.handleFollow(item)}}
            text={getTranslation(item.followed ? 'UNFOLLOW' : 'FOLLOW')}
            buttonStyle={`${style.buttonStyle} ${item.followed ? style.followed : ''}`}
            active={item.followed}
          />
        </div>
      </div> 
    );
  }

  render = ({communities, title, top, hideShowAll}) => {
    // if (communities.fetching && top > 1) {
    //   return (
    //     <div className={style.loaderCont}>
    //       <LoaderRing styles={{container: style.loaderWrap}}/>
    //     </div>
    //   );
    // }

    return (
      <div className={style.featuredCommunityWrap}>
        {title && <p className={`bold ${style.title}`}>{getTranslation(title)}</p>}
        {/* featured item */}
        {top === 1 && this.renderItem(communities.featured)}
        {/* items */}
        {top > 1 && communities.data
          .filter((item, i) => i < (top || 5))
          .map((item) => this.renderItem(item))}
        {!hideShowAll && communities.data && communities.data.length < communities.total && !communities.fetching && (
          <button className={style.showMore} onClick={this.handleShowAll}>
            <span className='bold'><span>&#8659;</span> {getTranslation('SHOW_ALL')}</span>
          </button>
        )}
        { !this.props.communities.data.length && this.props.communities.featured.length && <p className={style.noRecord}>{getTranslation('NO_DATA')}</p> }
      </div>
    )
  }
}

export default connect(['communities'])(FeaturedCommunities);