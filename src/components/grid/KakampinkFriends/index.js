import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import { fetchMembers } from '_mutations';
import { LeaderboardListing, LoaderRing } from '_components/core';
import style from './style';

class KakampinkFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }

	componentDidMount = () => {
	  fetchMembers();
	};

	componentDidUpdate = () => {
	  if (this.state.moreFetching && !this.props.members.fetching) {
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
	    fetchMembers(this.props.members.page + 1);
	  }
	};

	render = ({ members, showAllUrl, limit }, {}) => {
	  return (
	    <div className={style.hfWrap}>
	      <div className={style.titleContainer}>
	        <p className={`${style.title} bold`}>
	          {getTranslation('KAKAMPINK_FRIENDS')}
	        </p>
	        {/* ShowAllUrl, limit */}
	        {showAllUrl && members.data.length > 0 && (
	          <p
	            onClick={() => route(showAllUrl)}
	            className={`${style.seeAll} bold`}
	          >
	            {getTranslation('SEE_ALL_FRIENDS')}
	          </p>
	        )}
	      </div>

	      <div className={style.leaderboardContainer}>
	        {members.data.length > 0 && (
	          <LeaderboardListing
	            id={'points'}
	            fetching={false}
	            data={limit ? (members.data || []).slice(0, limit) : members.data}
	          />
	        )}

	        {members.data.length <= 0 && (
	          <div className={style.noRecordContainer}>
	            <p
	              onClick={() => route('/invite')}
	              dangerouslySetInnerHTML={{
	                __html: getTranslation('NO_KAKAMPINK_MEMBERS'),
	              }}
	              className={style.noRecord}
	            />
	          </div>
	        )}
	      </div>
	      {/* load more */}
	      {!showAllUrl &&
					members.data.length < members.total &&
					!members.fetching && (
	        <button className={style.showMore} onClick={this.handleShowMore}>
	          <span className={`bold`}>{getTranslation('LOAD_MEMBERS')}</span>
	        </button>
	      )}
	      {/* loader */}
	      {this.state.moreFetching && (
	        <LoaderRing styles={{ container: style.loaderWrap }} />
	      )}
	    </div>
	  );
	};
}
export default connect(['leaderboard', 'members'])(KakampinkFriends);
