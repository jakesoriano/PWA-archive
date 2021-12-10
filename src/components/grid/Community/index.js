import { Component } from 'preact';
import { getTranslation, formatN } from '_helpers';
import { filterCommunityByName } from '_mutations';
import { ImageLoader, ButtonDescription } from '_components/core';
import { route } from 'preact-router';
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
	};

  handleFollow = (e) => {
    e.target.classList.add(style.followed);
  }

  handleSearchByName = () => {
    const { search } = this.state
    if (search) {
      new Promise(() => {
        filterCommunityByName(search)
        .then((res) => {
          console.log(res);
        })
      });
    }
  }

  visitCommunity = (id) => {
  }

  renderCommunities = () => {
    console.log(this.state.data);
    return this.state.data.map((item, i) => (
      <div className={style.communityCard}>
        <div className={style.img}>
          <ImageLoader
            onClick={this.visitCommunity(item.id)}
            src={item.image}
            style={{container: style.img}}
          />
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
          <button onClick={this.handleSearchByName}>Search</button>
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
export default (Community);
