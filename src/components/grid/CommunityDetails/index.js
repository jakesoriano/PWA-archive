import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader, ButtonDescription } from '_components/core';
import { followCommunity, unFollowCommunity } from '_mutations';
import { getTranslation } from '_helpers';
import style from './style';

class CommunityDetails extends Component {

  handleFollow = (item) => {
    if (item.followed) {
      unFollowCommunity(item);
    } else {
      followCommunity(item);
    }
  };

  render = ({communityDetails}) => (
    <div className={style.communityDetailsWrap}>
      <ImageLoader
        src={communityDetails.details.image || getDefaultAvatar()}
        style={{ container: style.avatar }}
        lazy
      />
      <p class={`${style.heading} extraBold`}>{communityDetails.details.name}</p>
      <div class={style.buttonContainer}>
        <ButtonDescription
          onClickCallback={(e) => { this.handleFollow(communityDetails.details)}}
          text={getTranslation(communityDetails.details.followed ? 'UNFOLLOW' : 'FOLLOW')}
          buttonStyle={`${style.buttonStyle} ${communityDetails.details.followed ? style.followed : ''}`}
          active={communityDetails.details.followed}
        />
      </div>
    </div>
  )
}
export default connect(['communityDetails'])(CommunityDetails);