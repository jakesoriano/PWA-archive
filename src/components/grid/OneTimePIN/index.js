import { Component, createRef } from 'preact';
import { getTranslation } from '_helpers';
import { fetchOTP } from '_mutations';
import { connect } from 'unistore/preact';
import ButtonDescription from '_components/core/ButtonDescription';
import NotificationBox from '_components/core/NotificationBox';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class OneTimePIN extends Component {
	ref = createRef();
  constructor (props) {
    super(props);
    this.state = {
      pin: null,
			isOTPInvalid: false,
			isResendCd: false
    };
  }
	handleContinue = (e) => {
		let { pin, isOTPInvalid} = this.state;
	  if (this.verifyPIN(pin)) {
			alert('Success!');
		} else {
			if (!isOTPInvalid){
				console.log(isOTPInvalid);
				this.setState({
					isOTPInvalid: true,
				});
				setTimeout(() => {
					this.setState({
						isOTPInvalid: false
					})
				}, 5300);
			}
		}
	};

	verifyPIN = (pin) => {
	  const { otp } = this.props;
		return pin === otp.data.code.toString();
	}

	setCountdown = () => {
		let el = document.getElementById('timer');
		let seconds = 3;
		let timer;
		el.innerHTML = 'Resend';
		if (!timer) {
			this.setState({
				isResendCd: true
			});
			timer = window.setInterval(() => {
				if(seconds < 3) {
					el.innerHTML = seconds + ' s';
				}
				if (seconds > 0) {
					this.setState({
						seconds: seconds--
					});
				} else {
					clearInterval(timer);
					this.setState({
						isResendCd: false
					});
					el.innerHTML = 'Resend';
				}
			}, 1000)
		}
	}

	render = () => {
	  return (
	    <div ref={this.ref} className={style.otpWrapper}>
				{this.state.isOTPInvalid && <NotificationBox success={false} content={getTranslation('OTP_INVALID')}/>}
	      <div
	        className={style.otpContent}
	      >
					<p className={style.heading}>{getTranslation('OTP_ENTER')}</p>
					<label for="enteredPIN">
						<div className={style.otpBoxContainer}>
							{
								[...Array(6)].map((x, i) => {
									let { pin } = this.state;
									let digits = pin ? pin.toString() : pin;
									return <div className={style.otpBox}>{pin ? digits.charAt(i) : ''}</div>
								})
							}
						</div>
					</label>
					<p>{getTranslation('OTP_SENT').replace('{4_DIGITS}', '1234')}</p>
					<br />
					<p>
						{getTranslation('OTP_FAIL')}&nbsp;
						<span
							onClick={() => {
								console.log(this.state.isResendCd)
								if (!this.state.isResendCd) {
									this.setCountdown();
								}
							}}
							id="timer"
							class="bold"
						>Resend</span>
					</p>
					<input
						type="number"
						value={this.state.pin}
						name="enteredPIN"
						id="enteredPIN"
						className={style.enteredPIN}
						maxlength="6"
						ref={(el) => {
							if (el) {
								this.el = el;
							}
						}}
						onKeyUp={() => {
							this.setState({
								pin: this.el.value
							})
							if (this.el.value.length === 6) {
								this.el.blur();
							}
						}}
					/>
				</div>
	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={this.handleContinue}
	          text="Continue"
						isDisabled={this.state.pin ? this.state.pin.length < 6 : !this.state.pin}
	        />
	      </div>
	    </div>
	  );
	};
}
export default connect(['otp'])(OneTimePIN);;
