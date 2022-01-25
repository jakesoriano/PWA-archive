import { Component } from 'preact';
import { route } from 'preact-router';
import { displayPageLoader, showAlertBox } from '_helpers';
import { completeRegister, resendOTP } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { OneTimePIN } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class RegistrationOTP extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pin: null,
			isOTPInvalid: false,
			isResendCd: false,
			seconds: 60,
			inputFocus: false,
		};
	}

	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route(`/${this.props.parent}/signup`, true);
			},
		});
	};
	handleContinue = (pin) => {
		let { isOTPInvalid } = this.state;
		let data = {
			registrationId: this.props.signup.registrationId,
			otp: pin,
		};
		displayPageLoader(true);
		completeRegister(data).then((res) => {
			displayPageLoader(false);
			if (res.success) {
				route(`registration-invite`, true);
			} else {
				if (!isOTPInvalid) {
					showAlertBox('OTP_INVALID', true);
					this.setState({
						isOTPInvalid: true,
					});
					setTimeout(() => {
						this.setState({
							isOTPInvalid: false,
						});
					}, 5300);
				}
			}
		});
	};

	resetOTP = () => {
		const { registrationId, mobile } = this.props.signup || '';
		let data = {
			registrationId: registrationId,
			mobile: mobile,
		};
		return resendOTP(data);
	};

	render = ({}) => {
		return (
			<div className={style.regOtpWrapper}>
				<OneTimePIN
					mobile={this.props.signup.mobile}
					onClickCallback={this.handleContinue}
					onResendCallback={this.resetOTP}
				/>
			</div>
		);
	};
}
export default connect(['signup'])(RegistrationOTP);
