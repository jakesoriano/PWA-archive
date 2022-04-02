/* eslint-disable no-else-return */
import { Component } from 'preact';
import {
  getTranslation,
  displayPageLoader,
  successMessage,
  showAlertBox,
} from '_helpers';
import { crowdSourcingCheckout, checkCrowdSourcingtStatus } from '_mutations';
import { connect } from 'unistore/preact';
import { ImageLoader, FormInput, FormGroup } from '_components/core';
import { updateStore } from '_unistore';
import style from './style.scss';
import { route } from 'preact-router';

// eslint-disable-next-line react/prefer-stateless-function
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: {
        value: props.authUser?.profile?.fname || '',
        error: '',
        message: '',
        hasError: false,
      },
      phoneNumber: {
        value: props.authUser?.profile?.mobile || '',
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
      apiResponse: null,
      isFilipino: {
        required: false,
        checked: false,
      },
      isPaying: {
        required: false,
        checked: false,
      },
      isReceiving: {
        required: false,
        checked: false,
      },
    };
  }

	componentDidUpdate = () => {
	  // get transaction status
	  const apiResponse = this.state.apiResponse;
	  if (
	    apiResponse &&
			!apiResponse.fetching &&
			apiResponse.transactionId &&
			this.props.appResume
	  ) {
	    // set fetching state
	    this.setState(
	      {
	        apiResponse: {
	          ...apiResponse,
	          fetching: true,
	        },
	      },
	      () => {
	        // check status
	        displayPageLoader(true);
	        checkCrowdSourcingtStatus(this.state.apiResponse.transactionId)
	          .then((res) => {
	            displayPageLoader(false);
	            updateStore({ appResume: false }, true);
	            // success
	            if (res && res.status === 'completed') {
	              this.setState({ apiResponse: null });
	              const cartItem = this.props.cart?.data?.length
	                ? this.props.cart.data[0]
	                : {};
	              successMessage({
	                pageTitle: getTranslation('NANAYS_FOR_LENI'),
	                title: getTranslation('SUBMIT_SUCCESS'),
	                message: getTranslation('SUBMIT_SUCCESS_NANAY')
	                  .replace('{BRGY}', cartItem.name || '')
	                  .replace('{STATUS}', res.status),
	                cbBack: () => {
	                  route('/community-crowdsourcing', true);
	                },
	              });
	            } else {
	              this.setState({
	                apiResponse: {
	                  ...this.state.apiResponse,
	                  fetching: false,
	                },
	              });
	            }
	          })
	          .catch((err) => {
	            displayPageLoader(false);
	            updateStore({ appResume: false }, true);
	            this.setState({
	              apiResponse: null,
	            });
	          });
	      }
	    );
	  }
	};

	onCheckIsFilipino = () => {
	  this.setState({
	    isFilipino: {
	      ...this.state.isFilipino,
	      required: true,
	    },
	  });
	};

	onCheckIsPaying = () => {
	  this.setState({
	    isPaying: {
	      ...this.state.isPaying,
	      required: true,
	    },
	  });
	};

	onCheckIsReceiving = () => {
	  this.setState({
	    isReceiving: {
	      ...this.state.isReceiving,
	      required: true,
	    },
	  });
	};

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
	  const validEmail = value.match(
	    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
	  this.setState({
	    email: {
	      ...this.state.email,
	      value: value,
	      hasError: !Boolean(validEmail),
	      error: !Boolean(validEmail) ? 'Invalid Email' : '',
	    },
	  });
	};

	onCheckout = () => {
	  const { fullName, phoneNumber, email, isFilipino, isPaying, isReceiving } =
			this.state;
	  if (
	    !fullName.value ||
			!phoneNumber.value ||
			!email.value ||
			!isFilipino?.checked ||
			!isPaying?.checked ||
			!isReceiving?.checked
	  ) {
	    this.onFullNameChange(fullName.value);
	    this.onPhoneChange(phoneNumber.value);
	    this.onEmailChange(email.value);
	    this.onCheckIsFilipino();
	    this.onCheckIsPaying();
	    this.onCheckIsReceiving();
	  } else {
	    const { data } = this.props?.cart;
	    displayPageLoader(true);
	    const checkoutData = {
	      referenceId: data[0]?.id,
	      payerName: fullName?.value,
	      payerPhoneNumber: phoneNumber?.value,
	      payerEmail: email?.value,
	    };
	    crowdSourcingCheckout(checkoutData)
	      .then((res) => {
	        if (res?.redirectUrl) {
	          this.setState(
	            {
	              apiResponse: {
	                ...res,
	                fetching: false,
	              },
	            },
	            () => {
	              displayPageLoader(false);
	              window.open(
	                res.redirectUrl,
	                process.env.PLATFORM === 'android' ? '_blank' : '_self'
	              );
	            }
	          );
	        } else {
	          showAlertBox({
	            message: res?.message || 'SOMETHING_WRONG',
	          });
	        }
	        displayPageLoader(false);
	      })
	      .catch((err) => {
	        showAlertBox({
	          message: 'SOMETHING_WRONG',
	        });
	        displayPageLoader(false);
	      });
	  }
	};

	// getCartTotal = () =>
	//   this.props.cart.data.reduce((curr, next) => curr + next.price, 0);

	// removeFromCart = (item) => {
	//   updateStore({
	//     cart: {
	//       ...this.props.cart,
	//       data: this.props?.cart?.data?.filter(
	//         (cartItem) => cartItem?.id !== item?.id
	//       ),
	//     },
	//   });
	// };

	onClick = (url) => {
	  if (url && url.substr(0, 4) == 'http') {
	    window.open(url);
	  } else if (url) {
	    route(url);
	  }
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
	                <div className={`${style.itemMain}`}>
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
	                      {/* Barangay Address */}
	                      <span className={style.address}>
	                        {item?.volunteer?.name}
	                      </span>

	                      <div className={style.itemUserDescription}>
	                        <p>"{item?.shortDesc}"</p>
	                      </div>
	                    </div>
	                  </div>
	                  {/* More Info */}
	                  {/* More and Add to cart */}
	                  <div className={style.buttonContainer}>
	                    {/* Houses and Tarp */}
	                    <div className={style.housesTarp}>
	                      <div>
	                        <span className={style.count}>{item?.target}</span>
	                        <span>{getTranslation('HOUSES')}</span>
	                      </div>

	                      <div>
	                        <span className={style.count}>{item?.quantity}</span>
	                        <span>{getTranslation(item.purpose)}</span>
	                      </div>
	                    </div>

	                    <span
	                      className={style.itemAmount}
	                    >{`₱${item?.amount}`}</span>
	                    {!this.state.moreInfo && (
	                      <button
	                        onClick={() =>
	                          this.setState({ moreInfo: !this.state.moreInfo })}
	                        className={style.moreInfo}
	                      >
	                        {getTranslation('MORE_INFO')}
	                      </button>
	                    )}
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
	                          src={item?.volunteer?.image}
	                          style={{ container: style.volunteerImg }}
	                        />
	                      </div>

	                      <span className={style.volunteerDescription}>
	                        {item?.volunteer?.name}, {item?.volunteer.age} y.o
	                      </span>
	                    </div>

	                    {/* Description */}
	                    <span className={style.volunteer}>{item?.longDesc}</span>

	                    {/* Button */}
	                    <div
	                      onClick={() =>
	                        this.setState({ moreInfo: !this.state.moreInfo })}
	                      className={style.downButton}
	                    >
	                      <ImageLoader src="assets/images/downarrow.png" />
	                    </div>
	                  </div>
	                  {/* ) : null} */}
	                </div>
	              );
	            })}
	          </div>
	        </div>

	        {/* Inputs */}
	        <FormGroup>
	          <span className={style.title}>
	            {getTranslation('FOLLOWING_TERMS')}
	          </span>
	          <FormInput
	            id="accept"
	            type="checkbox"
	            label={getTranslation('IS_FILIPINO')}
	            checked={this.state.isFilipino.checked}
	            onClick={() => {
	              console.log({ state: this.state });
	              this.setState({
	                isFilipino: {
	                  ...this.state.isFilipino,
	                  checked: !this.state.isFilipino?.checked,
	                },
	              });
	            }}
	            name="isFilipino"
	            className={style.checkBox}
	            style={{
	              container:
									this.state.isFilipino?.required &&
									!this.state.isFilipino?.checked
									  ? style.checkWrap
									  : '',
	            }}
	          />
	          <FormInput
	            id="accept1"
	            type="checkbox"
	            label={getTranslation('IS_PAYING')}
	            checked={this.state.isPaying.checked}
	            onClick={() => {
	              console.log({ state1: this.state });
	              this.setState({
	                isPaying: {
	                  ...this.state.isPaying,
	                  checked: !this.state.isPaying?.checked,
	                },
	              });
	            }}
	            name="isPaying"
	            className={style.checkBox}
	            style={{
	              container:
									this.state.isPaying?.required && !this.state.isPaying?.checked
									  ? style.checkWrap
									  : '',
	            }}
	          />
	          <FormInput
	            id="accept2"
	            type="checkbox"
	            label={getTranslation('IS_RECEIVING')}
	            checked={this.state.isReceiving.checked}
	            onClick={() => {
	              console.log({ state2: this.state });
	              this.setState({
	                isReceiving: {
	                  ...this.state.isReceiving,
	                  checked: !this.state.isReceiving?.checked,
	                },
	              });
	            }}
	            name="isReceiving"
	            className={style.checkBox}
	            style={{
	              container:
									this.state.isReceiving?.required &&
									!this.state.isReceiving?.checked
									  ? style.checkWrap
									  : '',
	            }}
	          />
	        </FormGroup>

	        {/* Pay */}
	        <div className={style.payContainer}>
	          {/* <div className={style.overallPrice}>
	            <span className={style.titleAmount}>
	              {getTranslation('TOTAL_AMOUNT')}
	            </span>
	            <span className={style.totalAmount}>
								PHP {this.getCartTotal()}
	            </span>
	          </div> */}
	          <button
	            className={
								this.props.cart?.data.length > 0
								  ? `${style.pay}`
								  : style.payDisabled
	            }
	            onClick={() => this.onCheckout()}
	          >
	            <div>Pay</div>
	          </button>
	        </div>
	      </div>
	    );
	  }
	};
}
export default connect(['cart', 'authUser', 'appResume'])(Checkout);
