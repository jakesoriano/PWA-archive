import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, getDefaultAvatar } from '_helpers';
import style from './style';

class FeaturedTopRanking extends Component {
	renderUserTitle = (profile) => {
	  let user = profile.fname;
	  if (profile.region) {
	    user += `, ${profile.region}.`;
	  }
	  if (profile.municipality) {
	    user += ` ${profile.municipality}`;
	  }
	  return user;
	};

  renderDom = (data) => {
    return data ? (
      <div className={style.featured}>
        <ImageLoader 
          src={data.profile.image || getDefaultAvatar()}
          style={{ container: style.avatar }}
        />
        <div className={style.nameMember}>
          <div>
            <p className={`bold ${style.name}`}>
              {this.renderUserTitle(data.profile)}
            </p>
            <p className={`bold ${style.members}`}>{`${data.members} ${getTranslation('MEMBERS')}`}</p>
          </div>
        </div>
      </div>
    ) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  };

  render = ({ leaderboard }) => {
    if (!leaderboard.featured) {
      return null
    }
    return (
      <div className={style.featuredTopWrap}>
        <p className={`bold ${style.heading}`}>{getTranslation('FEATURED_TOP_RANKING_LEADER')}</p>
        {this.renderDom(leaderboard.featured)}
      </div>
    ) 
  };
}

export default connect(['leaderboard'])(FeaturedTopRanking);
