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
    fetchTopRanking();
  };

  renderDom = (data) => {
    return data ? (
      <div className={style.featured}>
        <ImageLoader 
          src={'https://static.wikia.nocookie.net/chuckychildsplay/images/9/90/GoodGuy1.jpg/revision/latest?cb=20191031223424' || getDefaultAvatar()}
          style={{container: style.avatar}}
        />
        <div className={style.nameMember}>
          <div>
            <p className={`light ${style.name}`}>
              {`${data.profile.fname} ${data.profile.lname}`},
              {`${data.profile.region} ${data.profile.municipality}`}
            </p>
            <p className={`light ${style.members}`}>{`${data.members} ${getTranslation('MEMBERS')}`}</p>
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