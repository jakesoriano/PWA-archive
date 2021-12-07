import { Component } from 'preact';
import { getTranslation } from '_helpers';
import { verifyOTP, sendOTP } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import ButtonDescription from '_components/core/ButtonDescription';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class OneTimePIN extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pin: null,
			isOTPInvalid: false,
			isResendCd: false,
			seconds: 60,
		};
	}
	componentDidMount = () => {
		const { signup } = this.props;
		if (signup && signup.hasOwnProperty('number')) sendOTP(signup.number);
	};
	handleContinue = (e) => {
		let { pin, isOTPInvalid } = this.state;
		let config = {
			body: {
				enteredPin: pin,
			},
		};
		verifyOTP(config).then((res) => {
			if (res) {
				alert('Success!');
			} else {
				if (!isOTPInvalid) {
					updateStore({
						alertShow: {
							success: false,
							content: getTranslation('OTP_INVALID')
						}
					});
					this.setState({
						isOTPInvalid: true,
					});
					setTimeout(() => {
						updateStore({
							alertShow: null
						});
						this.setState({
							isOTPInvalid: false,
						});
					}, 5300);
				}
			}
		});
	};

	setCountdown = () => {
		let { seconds } = this.state;
		let timer;
		if (!timer) {
			this.setState({
				isResendCd: true,
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

	render = () => {
		return (
			<div className={style.otpWrapper}>
				<div className={style.otpContent}>
					<p className={style.heading}>{getTranslation('OTP_ENTER')}</p>
					<label for="enteredPIN">
						<div className={style.otpBoxContainer}>
							{[...Array(6)].map((x, i) => {
								let { pin } = this.state;
								let digits = pin ? pin.toString() : pin;
								return (
									<div className={style.otpBox}>
										{pin ? digits.charAt(i) : ''}
									</div>
								);
							})}
						</div>
					</label>
					<p>{getTranslation('OTP_SENT').replace('{4_DIGITS}', '1234')}</p>
					<br />
					<p>
						{getTranslation('OTP_FAIL')}&nbsp;
						{!this.state.isResendCd && (
							<span
								onClick={() => {
									this.setCountdown();
								}}
								id="timer"
								class="bold"
							>
								Resend
							</span>
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
						onKeyUp={(e) => {
							let _this = e.target;
							this.setState({
								pin: _this.value,
							});
							if (e.target.value.length === 6) {
								_this.blur();
							}
						}}
					/>
				</div>
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="Continue"
						isDisabled={
							this.state.pin ? this.state.pin.length < 6 : !this.state.pin
						}
					/>
				</div>
			</div>
		);
	};
}
export default connect(['alertShow', 'signup'])(OneTimePIN);
