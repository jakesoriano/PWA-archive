import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation, displayPageLoader } from '_helpers';
import { forgotCredentials, resendOTP } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { OneTimePIN } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ForgotOTP extends Component {
	constructor(props) {
		super(props);
    this.settings = this.props.forgot.settings
		this.state = {
			pin: null,
			isOTPInvalid: false,
			isResendCd: false,
			seconds: 60,
			inputFocus: false
		};
	};

	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route(`/${this.props.parent}/forgot`, true)
			}
		});
	};
	handleContinue = (pin) => {
		let { isOTPInvalid } = this.state;
		let data = {
			id: this.props.forgot.id,
			otp: pin,
			mobile: this.props.forgot.mobile,
		};
		displayPageLoader(true);
		forgotCredentials('validateotp', data).then((res) => {
			displayPageLoader(false);
			if (res.success) {
        console.log(this.props.forgot);
        route(`/${this.props.parent}/forgot-${this.settings}`);
			} else {
				if (!isOTPInvalid) {
					this.showAlertBox(getTranslation('OTP_INVALID'));
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
		const { id, mobile } = this.props.forgot || '';
		let data = {
			id: id,
			mobile: mobile
		}
		return resendOTP(data);
	};

	showAlertBox = (message) => {
		updateStore({
			alertShow: {
				success: false,
				content: message
			}
		});
		setTimeout(() => {
			updateStore({
				alertShow: null
			});
		}, 5300);
	}
	render = ({}) => {
		return (
			<div className={style.regOtpWrapper}>
        <OneTimePIN
          mobile={this.props.forgot.mobile}
          onClickCallback={this.handleContinue}
          onResendCallback={this.resetOTP}
        />
			</div>
		);
	};
}
export default connect(['forgot'])(ForgotOTP);