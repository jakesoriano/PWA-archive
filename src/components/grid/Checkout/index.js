/* eslint-disable no-else-return */
import { Component } from 'preact';
import { getTranslation, displayPageLoader } from '_helpers';
import { connect } from 'unistore/preact';
import { ImageLoader, FormInput } from '_components/core';
import { updateStore } from '_unistore';
import style from './style.scss';
import { route } from 'preact-router';

// eslint-disable-next-line react/prefer-stateless-function
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      phoneNumber: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      email: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      isLoading: false,
      recaptchaChecked: false,
      showSuccess: false,
    };
  }

	onFullNameChange = (value) => {
	  this.setState({
	    fullName: {
	      ...this.state.fullName,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onPhoneChange = (value) => {
	  this.setState({
	    phoneNumber: {
	      ...this.state.phoneNumber,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onEmailChange = (value) => {
	  this.setState({
	    email: {
	      ...this.state.email,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onCheckout = () => {
	  this.setState({
	    showSuccess: true,
	  });
	  // if (!this.props.cart?.data.length) return;
	  const { fullName, phoneNumber, email } = this.state;
	  if (!fullName.value || phoneNumber.value || email.value) {
	    this.onFullNameChange(fullName.value);
	    this.onPhoneChange(phoneNumber.value);
	    this.onEmailChange(email.value);
	  } else {
	    displayPageLoader(true);
	    console.log({ state: this.state });

	    // get the data to be passed

	    // display success message
	  }
	};

	getCartTotal = () =>
	  this.props.cart.data.reduce((curr, next) => curr + next.price, 0);

	removeFromCart = (item) => {
	  updateStore({
	    cart: {
	      ...this.props.cart,
	      data: this.props?.cart?.data?.filter(
	        (cartItem) => cartItem?.id !== item?.id
	      ),
	    },
	  });
	};

	render = () => {
	  if (this.state.showSuccess) {
	    return (
	      <div className={style.checkoutSuccess}>
	        <ImageLoader
	          src="assets/images/icon_check_pink.png"
	          style={{ container: style.iconCheck }}
	        />

	        {/* Order Placed */}
	        <span className={style.orderPlaced}>
	          {getTranslation('ORDER_PLACED')}
	        </span>

	        <span className={style.support}>
	          {getTranslation('THANKYOU_SUPPORT')}
	        </span>

	        <div className={style.attention}>
	          <p
	            className={style.attentionTitle}
	            dangerouslySetInnerHTML={{ __html: getTranslation('ATTENTION') }}
	          />
	          <p
	            className={style.firstAttention}
	            dangerouslySetInnerHTML={{
	              __html: getTranslation('COMMITED_SUPPORT_1'),
	            }}
	          />
	          <p
	            className={style.secondAttention}
	            dangerouslySetInnerHTML={{
	              __html: getTranslation('COMMITED_SUPPORT_2'),
	            }}
	          />
	        </div>

	        {/* Go back to community crowdsourcing */}
	        <span
	          onClick={() => route(`/community-crowdsourcing`)}
	          className={style.goBack}
	        >
	          {getTranslation('GO_BACK')}
	        </span>
	      </div>
	    );
	  } else {
	    return (
	      <div className={style.checkoutContainer}>
	        {/* Form */}
	        <span className={style.title}>Contact Information</span>
	        <div className={style.formContainer}>
	          <FormInput
	            className={style.textInput}
	            style={{ error: style.fullName }}
	            value={this.state.fullName.value}
	            placeholder="Full Name*"
	            onInput={(e) => this.onFullNameChange(e.target.value)}
	            onBlur={(e) => this.onFullNameChange(e.target.value)}
	            hasError={this.state.fullName.hasError}
	            error={this.state.fullName.error}
	            message={this.state.fullName.message}
	          />
	          <FormInput
	            className={style.textInput}
	            placeholder="Phone Number*"
	            style={{ error: style.phoneNumber }}
	            value={this.state.phoneNumber.value}
	            onInput={(e) => this.onPhoneChange(e.target.value)}
	            onBlur={(e) => this.onPhoneChange(e.target.value)}
	            hasError={this.state.phoneNumber.hasError}
	            error={this.state.phoneNumber.error}
	            message={this.state.phoneNumber.message}
	          />
	          <FormInput
	            className={style.textInput}
	            placeholder="Email*"
	            style={{ error: style.email }}
	            value={this.state.email.value}
	            onInput={(e) => this.onEmailChange(e.target.value)}
	            onBlur={(e) => this.onEmailChange(e.target.value)}
	            hasError={this.state.email.hasError}
	            error={this.state.email.error}
	            message={this.state.email.message}
	          />
	        </div>

	        {/* Cart */}
	        <div className={style.cartContainer}>
	          <span className={style.title}>Order Summary</span>

	          <div className={style.cartItemContainer}>
	            {this.props.cart?.data?.map((item) => {
	              return (
	                <div className={style.itemMain}>
	                  <div className={style.itemContainer}>
	                    {/* Image */}
	                    <div className={style.itemImage}>
	                      <ImageLoader
	                        src={item?.image}
	                        style={{ container: style.img }}
	                      />
	                    </div>
	                    {/* Content */}
	                    <div className={style.contentContainer}>
	                      {/* Barangay Name and Price */}
	                      <div className={style.namePrice}>
	                        <span>{item?.barangayName}</span>
	                        <span onClick={() => this.removeFromCart(item)}>
	                          <ImageLoader
	                            src={`assets/images/NOT_INTERESTED-dark.png`}
	                            style={{ container: style.detailImage }}
	                            lazy
	                          />
	                        </span>
	                      </div>

	                      {/* Barangay Address */}
	                      <span className={style.address}>
	                        {item?.barangayAddress}
	                      </span>

	                      {/* Houses and Tarp */}
	                      <div className={style.housesTarp}>
	                        <div>
	                          <span className={style.count}>{item?.houses}</span>
	                          <span>{getTranslation('HOUSES')}</span>
	                        </div>

	                        <div>
	                          <span className={style.count}>
	                            {item?.tarpaulins}
	                          </span>
	                          <span>{getTranslation('TARPAULINS')}</span>
	                        </div>
	                      </div>

	                      {/* More and Add to cart */}
	                      <div className={style.namePrice}>
	                        <span>P {item?.price}</span>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	              );
	            })}
	          </div>
	        </div>

	        {/* Pay */}
	        <div className={style.payContainer}>
	          <div className={style.overallPrice}>
	            <span className={style.titleAmount}>
	              {getTranslation('TOTAL_AMOUNT')}
	            </span>
	            <span className={style.totalAmount}>
								PHP {this.getCartTotal()}
	            </span>
	          </div>
	          <div
	            className={
								this.props.cart?.data.length > 0
								  ? `${style.pay}`
								  : style.payDisabled
	            }
	            onClick={() => this.onCheckout()}
	          >
	            <div>Pay</div>
	          </div>
	        </div>
	      </div>
	    );
	  }
	};
}
export default connect(['cart'])(Checkout);
