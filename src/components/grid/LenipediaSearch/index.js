import { Component } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { fetchLenipedia, filterLenipedia } from '_mutations';
import { getTranslation, displayPageLoader } from '_helpers';
import style from './style';
class LenipediaSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: getCurrentUrl() === '/lenipedia' ? props.lpannouncements.filter : ''
    }
  }
  onFilterChange = (e) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        filter: e.target.value
      }, () => {
        if (getCurrentUrl() === '/lenipedia') {
          this.handleSearch();
        }
      })
    }, 500);
  }
  handleSearch = () => {
    let { lpannouncements } = this.props;
    updateStore({
      lpannouncements: {
        ...lpannouncements,
        filter: this.state.filter
      }
    });
    if (getCurrentUrl() === '/lenipedia') {
      if (this.state.filter) {
        displayPageLoader(true);
        filterLenipedia(this.state.filter).then(() => {
          displayPageLoader(false);
        });
      } else {
        displayPageLoader(true);
        fetchLenipedia().then(() => {
          displayPageLoader(false);
        });
      }
    } else {
      route('lenipedia');
    }
  }
  render = (props, state) => (
    <div className={style.leniSearchWrap}>
      {
        props.heading && (
          <div className={style.header}>
            <span className={style.title}>{getTranslation(props.heading)}</span>
          </div>
        )
      }
      <div className={style.search}>
        <input
          value={state.filter}
          name="communitySearch"
          placeholder="PinkPedia"
          onInput={this.onFilterChange}
        />
        <div id="lenipedia-search" onClick={this.handleSearch}>
          <ImageLoader
            src={'assets/images/magnifying_icon.png'}
            style={{ container: style.searchIcon }}
          />
        </div>
      </div>
    </div>
  );
}
export default connect(['lpannouncements'])(LenipediaSearch);
