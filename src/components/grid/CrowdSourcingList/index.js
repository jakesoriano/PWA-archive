import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { CrowdSourcingItem, LoaderRing } from '_components/core';
import { getTranslation, getConfigByKey } from '_helpers';
import { getCommunityCrowdsourcing } from '_mutations';
import style from './style';

class CrowdSourcingList extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: false,
      data: [],
      moreFetching: true,
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

	render = () => {
	  return (
	    <div className={style.hfWrap}>
	      {/* Title */}
	      <span className={style.title}>{this.props?.title}</span>

	      {/* List */}
	      {this.state?.data?.map((item) => {
	        return (
	          <CrowdSourcingItem
	            item={item}
	            setState={this.setState}
	            moreInfo={this.state.moreInfo}
	            // addToCart={this.addToCart}
	          />
	        );
	      })}

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

	      {this.state?.data.length < this.props.crowdsourcing?.total &&
					!this?.props?.crowdsourcing?.fetching && (
	          <button className={style.showMore} onClick={this.handleShowMore}>
	            <span>
	              <span>&#8659;</span> {getTranslation('SHOW_MORE')}
	            </span>
	          </button>
	        )}

	      {this.state.moreFetching && (
	        <LoaderRing styles={{ container: style.loaderWrap }} />
	      )}
	    </div>
	  );
	};
}
export default connect(['crowdsourcing'])(CrowdSourcingList);
