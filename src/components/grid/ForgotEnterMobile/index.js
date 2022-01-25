import { Component } from 'preact';
import { route, getCurrentUrl } from 'preact-router';
import { updateStore } from '_unistore';
import { forgotCredentials } from '_mutations';
import { ButtonDescription } from '_components/core';
import { getTranslation, displayPageLoader, showAlertBox } from '_helpers';
import style from './style';

class ForgotEnterMobile extends Component {
  constructor () {
    super();
    this.state = {
      mobile: null,
      settings: ''
    }
  }

  componentDidMount = () => {
    if (getCurrentUrl().includes('pw')) {
      this.setState({
        settings: 'password'
      })
    }
    if (getCurrentUrl().includes('un')) {
      this.setState({
        settings: 'username'
      })
    }
  }

  handleContinue = () => {
    let data = {
      mobile: this.state.mobile,
      settings: this.state.settings
    }
    displayPageLoader(true);
    forgotCredentials('sendotp', data).then((res) => {
      displayPageLoader(false);
      if (res.success) {
        route(`/${this.props.parent}/forgot-otp`);
      } else {
        if (res.error === 'MOBILE_NOT_FOUND') {
          showAlertBox(res.error, true);
        } else if (res.error === 'MOBILE_NOT_ALLOWED') {
          showAlertBox(res.error, true);
        } else {
          showAlertBox('SOMETHING_WRONG', true);
        }
      }
    })
  }

  onKeyup = (e) => {
    this.setState({
      mobile: e.target.value,
    });
  }
  
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

  render = () => {
    return (
      <div class={style.enterMobileWrapper}>
        <div class={style.inputContainer}>
          <p class={style.heading}>{getTranslation('ENTER_MOBILE')}</p>
          <input
            type="number"
            minLength={0}
            maxLength={11}
            onKeyUp={this.onKeyup}
          />
          <p class={style.inputSubtext}>{getTranslation('ENTER_11_DIGIT_MOBILE')}</p>
        </div>
				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="Continue"
						isDisabled={
							this.state.mobile ? this.state.mobile.length < 11 : !this.state.mobile
						}
					/>
        </div>
      </div>
    )
  }
}

export default ForgotEnterMobile;