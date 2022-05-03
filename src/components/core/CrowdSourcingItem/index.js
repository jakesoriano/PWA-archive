import { h, Component } from 'preact';
import { getDefaultAvatar, getTranslation } from '_helpers';
import ImageLoader from '../ImageLoader';
import { connect } from 'unistore/preact';
// eslint-disable-next-line import/extensions
import style from './style';
import { updateStore } from '_unistore';
import { route } from 'preact-router';

class CrowdSourcingItem extends Component {
  constructor() {
    super();
    this.state = {
      moreInfo: false,
    };
  }

	existingToCart = (item) => {
	  const itemId = itemId;
	  return this.props?.cart?.data?.some((i) => i.id === item?.id);
	};

	onClick = (url) => {
	  if (url && url.substr(0, 4) == 'http') {
	    window.open(url);
	  } else if (url) {
	    route(url);
	  }
	};

	onItemSupport = (item) => {
	  updateStore({
	    cart: {
	      data: [item],
	      loading: false,
	      result: true,
	    },
	  });
	  route(`/community-crowdsourcing/checkout`);
	};

	render = ({ item }) => {
	  return (
	  // eslint-disable-next-line react/jsx-no-bind
	    <div className={`${style.itemMain}`}>
	      <div className={style.itemContainer}>
	        {/* Image */}
	        <div className={style.itemImage}>
	          <ImageLoader src={item?.image} style={{ container: style.img }} />
	        </div>
	        {/* Content */}
	        <div className={style.contentContainer}>
	          {/* Barangay Name and Price */}
	          <div className={style.namePrice}>
	            <span>{item?.name}</span>
	            <span>{`₱${item?.amount}`}</span>
	          </div>

	          {/* Barangay Address */}
	          <span className={style.address}>{item?.volunteer?.name}</span>
	          {item?.longDesc && (
	            <div className={style.itemUserDescription}>
	              <p>"{item?.shortDesc}"</p>
	            </div>
	          )}
	        </div>
	      </div>
	      {/* More Info */}
	      {/* More and Add to cart */}
	      <div className={style.buttonContainer}>
	        {/* Houses and Tarp */}
	        <div className={style.housesTarp}>
	          {item?.target && (
	            <div>
	              <span className={`bold ${style.count}`}>{item?.target}</span>
	              <span>{getTranslation('HOUSES')}</span>
	            </div>
	          )}

	          <div>
	            <span className={`bold ${style.count}`}>{item?.quantity}</span>
	            <span>{getTranslation(item.purpose)}</span>
	          </div>
	        </div>
	        {!this.state.moreInfo && (
	          <button
	            onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}
	            className={style.moreInfo}
	          >
	            {getTranslation('MORE_INFO')}
	          </button>
	        )}
	        <button
	          onClick={() => {
	            console.log({ item });
	            // if (!this.existingToCart(item)) addToCart(item);
	            // this.onClick(item?.url);
	            this.onItemSupport(item);
	          }}
	          className={style.addToCart}
	        >
	          {getTranslation('SUPPORT_VOLUNTEER')}
	        </button>
	      </div>
	      {/* {this.state.moreInfo ? ( */}
	      <div
	        className={`${style.moreInfoContainer} ${
						this.state.moreInfo ? style.show : ''
					}`}
	      >
	        <span className={`bold ${style.title}`}>
	          {getTranslation('NANAY_VOLUNTEER')}
	        </span>

	        {/* Image and Info */}
	        <div className={style.volunteerInfo}>
	          <div className={style.volunteerImage}>
	            <ImageLoader
	              src={item?.volunteer?.image || getDefaultAvatar()}
	              style={{ container: style.volunteerImg }}
	            />
	          </div>

	          <span className={style.volunteerDescription}>
	            {item?.volunteer?.name}
	          </span>
	        </div>

	        {/* Description */}
	        {item?.longDesc && (
	          <span className={style.volunteer}>{item?.longDesc}</span>
	        )}

	        {/* Button */}
	        <div
	          onClick={() => this.setState({ moreInfo: !this.state.moreInfo })}
	          className={style.downButton}
	        >
	          <ImageLoader src="assets/images/downarrow.png" />
	        </div>
	      </div>
	      {/* ) : null} */}
	    </div>
	  );
	};
}

export default connect(['cart'])(CrowdSourcingItem);
