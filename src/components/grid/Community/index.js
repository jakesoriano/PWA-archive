import { Component } from 'preact';
import { getTranslation, formatN, replaceUrlPlaceholders } from '_helpers';
import { filterCommunityByName, fetchAllCommunities } from '_mutations';
import { ImageLoader, ButtonDescription } from '_components/core';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Community extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      data: [
        {
          id: 1,
          name: 'Palugaw Ni Leni',
          image: 'assets/images/tmp/community.JPG',
          followers: 0
        }
      ]
    }
  }
	componentDidMount = () => {
    fetchAllCommunities();
	};

  handleFollow = (e) => {
    e.target.classList.add(style.followed);
  }

  handleSearchByName = () => {
    const { search } = this.state
    if (search) {
      filterCommunityByName(search)
    }
  }

  visitCommunity = (id) => {
  }

  renderCommunities = () => {
    return this.props.communities.data.map((item, i) => (
      <div className={style.communityCard}>
        <div className={style.img}>
          {item.image &&
          <ImageLoader
            onClick={this.visitCommunity(item.id)}
            src={item.image ? (item.image.includes('http') ? item.image : `${process.env.CDN_DOMAIN}${item.image}`) : 'https://placeholder.com/80'}
            style={{container: style.img}}
          />
          }
        </div>
        <div className={style.cardBody}>
          <ButtonDescription
            onClickCallback={(this.handleFollow)}
            text={'Follow'}
            bottomDescription={item.name}
            buttonStyle={style.buttonStyle}
            bottomDescStyle={style.bottomDescStyle}
          />
          <p className={style.followers}>{formatN(9000, 2)} kakam-PINK</p>
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
            onKeyDown={(e) => {
              this.setState({
                search: e.target.value
              });
            }}
          />
          <ImageLoader
            onClick={this.handleSearchByName()}
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
