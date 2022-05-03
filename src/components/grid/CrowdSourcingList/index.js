import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { CrowdSourcingItem, LoaderRing, ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import { getCommunityCrowdsourcing } from '_mutations';
import style from './style';

class CrowdSourcingList extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: false,
      data: [],
      moreFetching: true,
      search: '',
      sort: 'ASC',
    };
  }

	componentDidMount = () => {
	  // fetch community volunteers
	  getCommunityCrowdsourcing();

	  this.setState({
	    data: this?.props?.crowdsourcing?.data,
	    moreFetching: false,
	  });
	};

	componentDidUpdate = (prevProps) => {
	  if (prevProps?.crowdsourcing?.data !== this.props.crowdsourcing?.data) {
	    this.setState({
	      data: this?.props?.crowdsourcing?.data,
	      moreFetching: false,
	    });
	  }
	};

	handleSearchInput = (e) => {
	  // filter
	  clearTimeout(this.timer);
	  this.timer = setTimeout(() => {
	    this.setState({
	      search: e.target.value,
	      data: (this?.props?.crowdsourcing?.data || [])
	        .filter(
	          (i) =>
	            !e.target.value ||
							(e.target.value &&
								(i.name || '')
								  .toLowerCase()
								  .indexOf(e.target.value.toLowerCase()) > -1)
	        )
	        .sort((a, b) => {
	          if (this.state.sort === 'ASC') {
	            return a.amount - b.amount;
	          }
	          return b.amount - a.amount;
	        }),
	    });
	  }, 500);
	};

	handleSort = () => {
	  const sort = this.state.sort === 'ASC' ? 'DESC' : 'ASC';
	  this.setState({
	    sort,
	    data: (this?.props?.crowdsourcing?.data || []).sort((a, b) => {
	      if (sort === 'ASC') {
	        return a.amount - b.amount;
	      }
	      return b.amount - a.amount;
	    }),
	  });
	};

	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    // flag
	    this.setState({
	      moreFetching: true,
	    });
	    // fetch
	    getCommunityCrowdsourcing(this?.props?.crowdsourcing?.page + 1);
	  }
	  console.log('res', this.state.data);
	};

	// addToCart = (item) => {
	//   updateStore({
	//     cart: {
	//       data: [...this.props?.cart?.data, item],
	//       fetching: false,
	//       loading: false,
	//     },
	//   });
	// };

	render = ({}, { search }) => {
	  return (
	    <div className={style.hfWrap}>
	      {/* Title */}
	      <span className={style.title}>{getTranslation(this.props?.title)}</span>

	      {/* Search input */}
	      <div className={style.search}>
	        <ImageLoader
	          src={'assets/icons/magnifier.png'}
	          style={{ container: style.searchIcon }}
	        />
	        <input
	          value={search || ''}
	          name="search"
	          placeholder="Search"
	          onInput={this.handleSearchInput}
	        />
	      </div>

	      {/* List Header */}
	      {this.state?.data?.length ? (
	        <div className={style.listHeader}>
	          <div className={style.item}>
	            <span>{getTranslation('RESULTS')}</span>
	          </div>
	          <div className={style.item}>
	            <a onClick={this.handleSort}>
	              <span>{`Price: ${
									this.state.sort === 'ASC'
									  ? 'Lowest to Highest'
									  : 'Highest to Lowest'
								}`}</span>
	              <ImageLoader
	                src={'assets/icons/sort.png'}
	                style={{ container: style.sortIcon }}
	              />
	            </a>
	          </div>
	        </div>
	      ) : null}

	      {/* List */}
	      {this.state?.data?.length ? (
					this.state?.data?.map((item) => {
					  return (
					    <CrowdSourcingItem
					      item={item}
					      setState={this.setState}
					      moreInfo={this.state.moreInfo}
					      // addToCart={this.addToCart}
					    />
					  );
					})
	      ) : this.state?.search ? (
	        <span className={style.empty}>{getTranslation('NO_DATA')}</span>
	      ) : (
	        <span className={style.empty}>
	          {getTranslation('LOOKING_VOLUNTEERS')}
	        </span>
	      )}

	      {/* Checkout */}
	      {/* <div className={style.checkout} onClick={this.onShowPopup}>
	        <div
	          onClick={() => route(`/community-crowdsourcing/checkout`)}
	          dangerouslySetInnerHTML={{
	            __html: getTranslation('CHECKOUT')?.replace(
	              '{num}',
								this.props?.cart?.data.length
	            ),
	          }}
	        />
	      </div> */}

	      {/* Fetch more */}

	      {/* {this.state?.data.length < this.props.crowdsourcing?.total &&
					!this?.props?.crowdsourcing?.fetching && (
	          <button className={style.showMore} onClick={this.handleShowMore}>
	            <span>
	              <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	            </span>
	          </button>
	        )} */}

	      {this.state.moreFetching && (
	        <LoaderRing styles={{ container: style.loaderWrap }} />
	      )}
	    </div>
	  );
	};
}
export default connect(['crowdsourcing'])(CrowdSourcingList);
