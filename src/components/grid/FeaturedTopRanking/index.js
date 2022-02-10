import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import { fetchTopRanking } from '_mutations';
import style from './style';

class FeaturedTopRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRanking: 'overall'
    }
  };

  componentDidMount = () => {
    let data = {
      type: 'global',
      top: 1
    }
    fetchTopRanking(data);
  };

  renderDom = (data) => {
    return data ? (
      <div className={style.featured}>
        <ImageLoader 
          src={data.profile.image || getDefaultAvatar()}
          style={{container: style.avatar}}
        />
        <div className={style.nameMember}>
          <div>
            <p className={`bold ${style.name}`}>
              {`${data.profile.fname} ${data.profile.lname}, `}
              {`${data.profile.region}, ${data.profile.municipality}`}
            </p>
            <p className={`bold ${style.members}`}>{`${data.members} ${getTranslation('MEMBERS')}`}</p>
          </div>
        </div>
      </div>
    ) : <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
  };

  render = ({topOverall}, {selectedRanking}) => {
    return (
      <div className={style.featuredTopWrap}>
        <p className={`bold ${style.heading}`}>{getTranslation('FEATURED_TOP_RANKING_LEADER')}</p>
        {this.renderDom(topOverall.data)}
      </div>
    ) 
  };
};

export default connect(['topOverall'])(FeaturedTopRanking);