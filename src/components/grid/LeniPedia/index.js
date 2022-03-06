import { Component } from 'preact';
import { getTranslation, getConfigByKey, componentModal } from '_helpers';
import { connect } from 'unistore/preact';
import {
  fetchLenipedia,
  filterLenipedia,
  likeShareLenipedia,
  removeLikeLenipedia,
} from '_mutations';
import { Articles, LoaderRing, ArticleDetails } from '_components/core';
import { nativeShare } from '_platform/helpers';
import style from './style';
class LeniPedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }
	onClickItem = (data) => {
	  componentModal({
	    content: <ArticleDetails data={data} />,
	  });
	};
	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    this.setState({
	      moreFetching: true,
	    });
	    this.fetchData(this.props.lpannouncements.page + 1);
	  }
	};
	onShare = (item) => {
	  nativeShare({
	    url: item.image,
	    title: item.title,
	    message: `\n\n
				We tell it as it is. Only the truth, KakamPink!\n\n
				Shared via Kakampink App\n
				Download now!\n
				Android: ${getConfigByKey('playStore')}\n
				iOS: ${getConfigByKey('appStore')}\n\n
				Article Title: ${item.title}\n
				Ariticle Link: ${item.link || ''}\n
				Use my invite code: ${this.props.authUser.profile.refCode}
			`,
	  });
	  if (!item.shared) {
	    likeShareLenipedia(item, 'shared');
	  }
	};
	onLike = (item) => {
	  !item.liked ? likeShareLenipedia(item, 'liked') : removeLikeLenipedia(item);
	};
	fetchData = (page) => {
	  this.props.lpannouncements.filter
	    ? filterLenipedia(this.props.lpannouncements.filter, page)
	    : fetchLenipedia(page);
	};
	componentDidMount = () => {
	  this.fetchData();
	};

	componentDidUpdate = () => {
	  if (this.state.moreFetching && !this.props.lpannouncements.fetching) {
	    this.setState({
	      moreFetching: false,
	    });
	  }
	};
	render = (props, state) => {
	  return (
	    <>
	      <div className={style.leniPediaWrap}>
	        {props.lpannouncements.data?.length && (
	          <p className={style.rText}>{getTranslation('RESULTS')}</p>
	        )}
	        <Articles
	          dataType="lenipedia"
	          data={props.lpannouncements.data}
	          onClickItemCallback={this.onClickItem}
	          onLikeCallback={this.onLike}
	          onShareCallback={this.onShare}
	        />
	        {props.lpannouncements.data.length < props.lpannouncements.total &&
						!state.moreFetching && (
	          <button className={style.showMore} onClick={this.handleShowMore}>
	            <span>
	              <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	            </span>
	          </button>
	        )}
	        {state.moreFetching && (
	          <LoaderRing styles={{ container: style.loaderWrap }} />
	        )}
	      </div>
	    </>
	  );
	};
}
export default connect(['lpannouncements', 'authUser'])(LeniPedia);
