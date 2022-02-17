import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { communitySort } from '_constant';
import { ImageLoader } from '_components/core'
import { showFilter, displayPageLoader } from '_helpers';
import { store, updateStore } from '_unistore';
import { filterCommunity, fetchCommunities } from '_mutations';
import style from './style';
class CommunitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.communities.filter || '',
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
  };

  handleSort = () => {
    var selected = '';
    communitySort.map((i) => {
      if (i.value === this.props.communities.sort) {
        selected = i.value;
      }
    })
		let props = {
			data: communitySort,
			onClickParent: (val) => this.onClickCallback(val),
			onClickChild: (val) => this.onClickCallback(val),
			selected: selected || null,
		};

		// show popup options
		showFilter(props);
  }

	onClickCallback = (val) => {
    try {
      const { communities } = store.getState();
      updateStore({
        communities: {
          ...communities,
          sort: val.parentVal
        }
      });
      displayPageLoader(true);

      filterCommunity(this.props.communities.filter, val.parentVal).then((a) => {
        displayPageLoader(false);
        showFilter(null);
      });
    } catch (err) {
      console.log(err);
    }
	};

  render = ({communities, showSort}) => (
    <div className={style.searchWrap}>
      <div className={style.search}>
        <input
          value={communities.filter || ''}
          name="communitySearch"
          placeholder="Search a Community"
          onInput={this.handleSearchByName}
        />
        <ImageLoader
          src={'assets/images/magnifying_icon.png'}
          style={{container: style.searchIcon}}
        />
      </div>
      {
        showSort && <div className={style.sort} onClick={this.handleSort}>
          <ImageLoader
            src={'assets/icons/icon_sort.png'}
            style={{container: style.sortIcon}}
          />
        </div>
      }
    </div>
  )
}
export default connect(['communities'])(CommunitySearch);