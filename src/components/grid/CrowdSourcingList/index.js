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

	getLinkByPrice = (price) => {
	  const config = getConfigByKey('crowdsourcing');
	  const result = (config?.links || []).find((i) => i.price === price);
	  return result ? result.url : config?.linkDefault || null;
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
	        const prices = [500, 1000, 1500, 2000];
	        const price = prices[Math.floor(Math.random() * prices.length)];
	        item = {
	          id: 'asdasdasd',
	          image: '01FPKV8B1N1KGXJH8B5Z0CS52V.jpeg',
	          barangayName: 'San Juan',
	          barangayAddress: 'San Juan, Rizal',
	          moreInfo:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	          tarpaulins: 400,
	          houses: 500,
	          volunteerName: 'Nanay Ermelita',
	          volunteerAge: 46,
	          volunteerDescription:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	          itemUserDescription: 'Kailangan po namin ng pamigay na tarpaulin',
	          supportUrl: this.getLinkByPrice(price),
	          price,
	        };
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
