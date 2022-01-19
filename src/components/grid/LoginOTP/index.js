import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation, displayPageLoader } from '_helpers';
import { loginOTP, login } from '_mutations';
import { connect } from 'unistore/preact';
import { store,updateStore } from '_unistore';
import { OneTimePIN } from '_components/core';
import style from './style.scss';

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
		let { isOTPInvalid } = this.state;
		let data = {
			otp: pin,
			username: this.props.loginInfo.username,
		};
		displayPageLoader(true);
		loginOTP(data).then((res) => {
			if (res) {
				route(`/`);
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
			displayPageLoader(false);
		});
	};

	resetOTP = () => {
		const { loginInfo, password } = store.getState();
		let data = {
			username: loginInfo.username,
			password
		};
		displayPageLoader(true);
		login(data)
			.then((res) => {
				displayPageLoader(false);
			})
			.catch((err) => {
				displayPageLoader(false);
			});;
	};

	showAlertBox = (message) => {
		updateStore({
			alertShow: {
				success: false,
				content: message,
			},
		});
		setTimeout(() => {
			updateStore({
				alertShow: null,
			});
		}, 5300);
	};
	render = ({loginInfo},{}) => {
		return (
			<div className={style.loginOtpWrapper}>
				<OneTimePIN
					mobile={loginInfo.mobile}
					onClickCallback={this.handleContinue}
					onResendCallback={this.resetOTP}
				/>
			</div>
		);
	};
}
export default connect(['loginInfo'])(LoginOTP);
