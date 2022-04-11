import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import { updateStore } from '_unistore';
import { LoaderRing } from '_components/core';
import { fetchCSTransactions } from '_mutations';
import style from './style';
class CrowdSourcingTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }
	componentDidMount = () => {
	  fetchCSTransactions();
	};

	handleShowMore = () => {
	  if (!this.state.moreFetching) {
	    // flag
	    this.setState({
	      moreFetching: true,
	    });
	    // fetch
	    fetchCSTransactions(this.props.cstransactions.page + 1).then(() => {
	      this.setState({
	        moreFetching: false,
	      });
	    });
	  }
	};

	renderItem = (item) => {
	  return (
	    item && (
	      <div
	        className={style.tItem}
	        onClick={() => {
	          let { cstransactions, page } = this.props;
	          updateStore({
	            cstransactions: {
	              ...cstransactions,
	              selected: item,
	            },
	          });
	          route(`/${page}/cs-transaction-details`);
	        }}
	      >
	        <div className={style.info}>
	          <p className={style.name}>
	            <span className={`bold ${style.csname}`}>
	              {item.crowdsource.name}
	            </span>{' '}
							|
	            <span className={style.vname}>
	              {item.crowdsource.volunteerName}
	            </span>
	          </p>
	          <p className={style.status}>
	            {getTranslation('STATUS')}:
	            <em>
	              {item.hasOwnProperty('h2hProof')
	                ? getTranslation('TRANSACTION_RECEIVED')
	                : item.hasOwnProperty('disbursed')
	                  ? getTranslation('TRANSATION_OTW')
	                  : getTranslation('TRANSACTION_VERIFYING')}
	            </em>
	          </p>
	        </div>
	        <span className={`bold ${style.arrow}`}>&gt;</span>
	      </div>
	    )
	  );
	};

	render = ({ title, cstransactions, max, hideSeeAll }) => {
	  return (
	    <div className={style.tWrap}>
	      <div className={style.head}>
	        {
	          // title
	          title && <span className={style.title}>{title}</span>
	        }
	        {!hideSeeAll && (
	          <span
	            className={`bold ${style.see_all}`}
	            onClick={() => route('/cs-transactions')}
	          >
	            {getTranslation('SEE_ALL')}
	          </span>
	        )}
	      </div>
	      {
					// recent transactions
					cstransactions.data?.length && (
	          <div className={style.tContainer}>
	            {cstransactions.data.map((item, i) => {
	              if (max && i + 1 <= max) {
	                return this.renderItem(item);
	              }
	              if (!max) {
	                return this.renderItem(item);
	              }
	            })}
	            {/* show more */}
	            {!max &&
								cstransactions.data.length < cstransactions.total &&
								!cstransactions.fetching && (
	              <button
	                className={style.showMore}
	                onClick={this.handleShowMore}
	              >
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
	        )
	      }
	      {
	        // no data
	        !cstransactions.data?.length && <p>{getTranslation('NO_DATA')}</p>
	      }
	    </div>
	  );
	};
}
export default connect(['cstransactions'])(CrowdSourcingTransactions);
