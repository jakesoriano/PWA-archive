import { Component } from 'preact';
import { getTranslation, displayPageLoader, showAlertBox, getConfigByKey } from '_helpers';
import { ButtonDescription } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class OneTimePIN extends Component {
  constructor(props) {
    const interval = parseInt(getConfigByKey('otpInterval') || 5) * 60;
    super(props);
    this.state = {
      pin: null,
      isResendCd: false,
      seconds: interval,
      inputFocus: false,
      interval,
    };
  }
	
	componentDidMount = () => {
	  this.setCountdown();
	};

	setCountdown = () => {
	  let { seconds } = this.state;
	  let timer;
	  if (seconds === 1) {
	    this.setState({
	      seconds: this.state.interval
	    })
	    seconds = this.state.interval;
	  }
	  if (!timer) {
	    this.setState({
	      isResendCd: true,
	      pin: ''
	    });
	    timer = window.setInterval(() => {
	      if (seconds > 0) {
	        this.setState({
	          seconds: seconds--,
	        });
	      } else {
	        clearInterval(timer);
	        this.setState({
	          isResendCd: false,
	        });
	      }
	    }, 1000);
	  }
	};

	renderBox = (i, isActive, isLast) => {
	  const pin = this.state.pin || '';
	  const isFocus = this.state.inputFocus && (pin.length === i || (isLast && pin.length === (i + 1)));
	  return (
	    <div
	      className={`${style.otpBox} ${isFocus ? style.otpBoxActive : ''} ${isActive ? style.otpBoxActive : ''}`}>
	      {pin.charAt(i)}
	    </div>
	  );
	};

	toggleInputFocus = (value) => {
	  this.setState({
	    inputFocus: value
	  });
	};

	onKeyup = (e) => {
	  let _this = e.target;
	  this.setState({
	    pin: _this.value,
	  });
	  if (e.target.value.length === 6) {
	    _this.blur();
	  }
	};
	render = ({ mobile, hideContent }, { pin }) => {
	  return (
	    <div className={style.otpWrapper}>
	      <div className={style.otpContent}>
	        {!hideContent && (
	          <div> 
	            <p className={style.heading}>{getTranslation('OTP_ENTER')}</p>
	            <label for="enteredPIN">
	              <div className={style.otpBoxContainer}>
	                {this.renderBox(0, (pin && pin.length >= 1 ? true : false))}
	                {this.renderBox(1, (pin && pin.length >= 2 ? true : false))}
	                {this.renderBox(2, (pin && pin.length >= 3 ? true : false))}
	                {this.renderBox(3, (pin && pin.length >= 4 ? true : false))}
	                {this.renderBox(4, (pin && pin.length >= 5 ? true : false))}
	                {this.renderBox(5, (pin && pin.length >= 6 ? true : false), true)}
	              </div>
	            </label>
	            <p>{getTranslation('OTP_SENT').replace('{4_DIGITS}', mobile.slice(mobile.length - 4))}</p>
	            <br />
	            <p>
	              {getTranslation('OTP_FAIL')}&nbsp;
	              {!this.state.isResendCd && (
	                <span
	                  onClick={() => {
	                    displayPageLoader(true);
	                    this.props.onResendCallback().then((res) => {
	                      displayPageLoader(false);
	                      if (res.success) {
	                        this.setCountdown();
	                      } else {
	                        showAlertBox({
	                          message: 'SOMETHING_WRONG'
	                        });
	                      }
	                    });
	                  }}
	                  id="timer"
	                  class="bold"
	                >{getTranslation('RESEND')}</span>
	              )}
	              {this.state.isResendCd && (
	                <span className={`${style.timer} ${'bold'}`}>
	                  {this.state.seconds}s
	                </span>
	              )}
	            </p>
	            <input
	              type="number"
	              value={this.state.pin}
	              name="enteredPIN"
	              id="enteredPIN"
	              className={style.enteredPIN}
	              maxlength="6"
	              minLength="0"
	              onBlur={() => {
	                this.toggleInputFocus(false);
	              }}
	              onFocus={() => {
	                this.toggleInputFocus(true);
	              }}
	              onKeyUp={this.onKeyup}
	            />
	          </div>
	        )}
	      </div>
	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={() => this.props.onClickCallback(pin)}
	          text="Continue"
	          isDisabled={
	            pin ? pin.length < 6 : !pin
	          }
	        />
	      </div>
	    </div>
	  );
	};
}
export default OneTimePIN;
