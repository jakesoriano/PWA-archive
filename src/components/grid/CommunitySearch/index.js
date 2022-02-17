import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core'
import { filterCommunity, fetchCommunities } from '_mutations';
import style from './style';
class CommunitySearch extends Component {
  
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
  }

  render = ({communities}) => (
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
  )
}
export default connect(['communities'])(CommunitySearch);