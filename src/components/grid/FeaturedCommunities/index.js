import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { store, updateStore } from '_unistore';
import { ImageLoader, ButtonDescription } from '_components/core';
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
    const { communities } = this.props;
    let obj = {...communities};
    if (!communities.data.length) {
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

  render = ({communities, title, top, hideShowAll}) => {
    return (
      <div className={style.featuredCommunityWrap}>
        {title && <p className={`bold ${style.title}`}>{getTranslation(title)}</p>}
        {
          communities.featured && communities.featured
          .filter((item, i) => (i < (top || 5)))
          .map((item) => (
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
                  onClickCallback={(e) => { this.handleFollow(item)}}
                  text={getTranslation(item.followed ? 'UNFOLLOW' : 'FOLLOW')}
                  buttonStyle={`${style.buttonStyle} ${item.followed ? style.followed : ''}`}
                  active={item.followed}
                />
              </div>
            </div> 
          ))
        }
        {!hideShowAll && communities.data.length < communities.total && !communities.fetching && (
          <button className={style.showMore} onClick={this.handleShowAll}>
            <span className='bold'><span>&#8659;</span> {getTranslation('SHOW_ALL')}</span>
          </button>
        )}
        { !this.props.communities.featured.length && <p className={style.noRecord}>{getTranslation('NO_DATA')}</p> }
      </div>
    )
  }
}

export default connect(['featuredCommunities', 'communities'])(FeaturedCommunities);