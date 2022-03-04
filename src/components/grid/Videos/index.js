import { Component } from 'preact';
import { route } from 'preact-router';
import { store, updateStore } from '_unistore';
import { getTranslation, removeTags } from '_helpers';
import { fetchVideos, filterVideos } from '_mutations';
import { ImageLoader, LoaderRing } from '_components/core';
import { connect } from 'unistore/preact';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Videos extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      moreFetching: false,
    };
    this.timer = null;
  }
	componentDidMount = () => {
	  fetchVideos();
	};

	componentDidUpdate = () => {
	  if (this.state.moreFetching && !this.props.videos.fetching) {
	    this.setState({
	      moreFetching: false,
	    });
	  }
	};

	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    // flag
	    this.setState({
	      moreFetching: true,
	    });
	    // fetch
	    if (this.state.text) {
	      filterVideos(this.state.text, this.props.videos.page + 1);
	    } else {
	      fetchVideos(this.props.videos.page + 1);
	    }
	  }
	};

	handleSearchByName = (e) => {
	  // filter
	  clearTimeout(this.timer);
	  this.timer = setTimeout(() => {
	    if (e.target.value) {
	      filterVideos(e.target.value);
	      this.setState({
	        text: e.target.value,
	      });
	    } else {
	      fetchVideos();
	    }
	  }, 500);
	};

	gotoVideo = (item) => {
	  let { videos } = store.getState();
	  let selected = item;
	  updateStore({
	    videos: {
	      ...videos,
	      selected,
	    },
	  });
	  route(`/${this.props.parent}/video-details`);
	};

	renderVideos = () => {
	  if (!this.props.videos.data.length) {
	    return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>;
	  }
	  return this.props.videos.data.map((item, i) => (
	    <div className={style.videosCard}>
	      {item.image && (
	        <div
	          onClick={() => {
	            this.gotoVideo(item);
	          }}
	        >
	          <ImageLoader
	            src={item.image}
	            style={{ container: style.imgCont, image: style.img }}
	            lazy
	          />
	        </div>
	      )}
	      <p
	        className={`bold ${style.title}`}
	        onClick={() => {
	          this.gotoVideo(item);
	        }}
	      >
	        {item.title}
	      </p>
	      <p
	        className={style.desc}
	        onClick={() => {
	          this.gotoVideo(item);
	        }}
	      >
	        {removeTags(item.desc).substr(0, 100)}...
	      </p>
	    </div>
	  ));
	};

	render = ({ videos }) => {
	  return (
	    <div className={style.videosWrapper}>
	      <div className={style.search}>
	        <input
	          name="videoSearch"
	          placeholder="Search Videos"
	          onInput={this.handleSearchByName}
	        />
	        <ImageLoader
	          src={'assets/images/magnifying_icon.png'}
	          style={{ container: style.searchIcon }}
	        />
	      </div>
	      <div className={style.videosBody}>
	        <div className={style.videos}>{this.renderVideos()}</div>
	        {/* show more */}
	        {videos.data.length < videos.total && !videos.fetching && (
	          <button className={style.showMore} onClick={this.handleShowMore}>
	            <span>
	              <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	            </span>
	          </button>
	        )}
	        {/* loader */}
	        {this.state.moreFetching && (
	          <LoaderRing styles={{ container: style.loaderWrap }} />
	        )}
	      </div>
	    </div>
	  );
	};
}
export default connect(['videos'])(Videos);
