import { Component } from 'preact';
import { getTranslation } from '_helpers';
import { connect } from 'unistore/preact';
import { fetchLenipedia, filterLenipedia } from '_mutations'
import { AnnouncementsList, LoaderRing } from '_components/core';
import style from './style';
class LeniPedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      moreFetching: false,
    }
  }
	onClickItem = (data) => {
		this.setState({
			selectedItem: data
		});
	};
  handleShowMore = () => {
    if (!this.state.moreFetching) {
      this.setState({
        moreFetching: true
      });
      this.fetchData(this.props.lpannouncements.page + 1);
    }
  };
  fetchData = (page) => {
    this.props.lpannouncements.filter ? filterLenipedia(this.props.lpannouncements.filter, page) : fetchLenipedia(page);
  }
  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = () => {
    if (this.state.moreFetching && !this.props.lpannouncements.fetching) {
      this.setState({
        moreFetching: false
      });
    }
  }
  render = (props, state) => {
    return (
      <div className={style.leniPediaWrap}>
        <AnnouncementsList dataType="lenipedia" data={props.lpannouncements.data} onClickItemCallback={this.onClickItem} />
        {
          props.lpannouncements.data.length < props.lpannouncements.total && !state.moreFetching && (
            <button className={style.showMore} onClick={this.handleShowMore}>
              <span><span>&#8659;</span> {getTranslation('SHOW_MORE')}</span>
            </button>
          )
        }
        {
          state.moreFetching && (
            <LoaderRing styles={{container: style.loaderWrap}}/>
          )
        }
      </div>
    );
  };
}
export default connect(['lpannouncements'])(LeniPedia);