import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation, displayPageLoader, showAlertBox } from '_helpers';
import { loginOTP, login } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { OneTimePIN } from '_components/core';
import style from './style.scss';
import {
  nativeSetCredential,
} from '_platform/helpers';

// eslint-disable-next-line react/prefer-stateless-function
class LoginOTP extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pin: null,
			isOTPInvalid: false,
			isResendCd: false,
			seconds: 60,
			inputFocus: false,
			isUsernameSet: false
		};
	}

	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route(`/`, true);
			},
		});
	};
	handleContinue = (pin) => {
		const { isOTPInvalid } = this.state;
		const {
			isAuto,
			username,
			password
		} = this.props.loginInfo;
		const data = {
			otp: pin,
			username: username,
		};
		displayPageLoader(true);
		loginOTP(data).then((res) => {
			if (res) {
				if (!isAuto) {
					nativeSetCredential({username, password});
				}
				route(`/home`, true);
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
			displayPageLoader(false);
		});
	};

	resetOTP = () => {
		let data = {
			username: this.props.loginInfo.username,
			password: this.props.loginInfo.password,
			deviceId: this.props.loginInfo.deviceId
		};
		return login(data)
			.then((res) => {
				return {
					success: res.otp
				}
			})
			.catch((err) => {
				return {
					success: false
				}
			});;
	};

	render = ({loginInfo},{}) => {
		return (
			<div className={style.loginOtpWrapper}>
				<OneTimePIN
					mobile={(loginInfo && loginInfo.mobile) || ''}
					onClickCallback={this.handleContinue}
					onResendCallback={this.resetOTP}
				/>
			</div>
		);
	};
}
export default connect(['loginInfo'])(LoginOTP);
