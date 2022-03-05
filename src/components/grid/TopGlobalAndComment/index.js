import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, getDefaultAvatar, getShoutoutMessage } from '_helpers';
import style from './style';
class TopGlobalAndComment extends Component {
  render = ({ leaderboard }) => {
    if (!leaderboard.featured) {
      return null
    }
    return (
      <div className={style.invitedCountWrap}>
        <div className={style.featured}>
          <ImageLoader 
            src={leaderboard.featured.profile.image || getDefaultAvatar()}
            style={{ container: style.avatar }}
            lazy
          />
          <div className={style.topLeader}>
            <div>
              <p>{`${getTranslation('PAGE_LEADERBOARD')}:`}</p>
              <p>{getTranslation('FEATURED')}</p>
              <p>{getTranslation('KAKAMPINK')}</p>
              <p>
                <span>{leaderboard.featured.profile.fname}</span> <span>{leaderboard.featured.profile.lname}</span>
              </p>
            </div>
          </div>
        </div>
        {/* hide for now as per edric */}
        {/* <div className={style.adminWrap}>
          <div className={style.admin}>
            <ImageLoader 
              src={'assets/images/pink_dialog.png'}
              style={{ container: style.dialog }}
              lazy
            />
            {getShoutoutMessage(`${leaderboard.featured.profile.fname} ${leaderboard.featured.profile.lname}`)}
          </div>
          <ImageLoader 
            src={getDefaultAvatar()}
            style={{ container: style.avatar }}
            lazy
          />
        </div> */}
      </div>
    );
  }
}
export default connect(['leaderboard'])(TopGlobalAndComment);
