import { Component } from 'preact';
import { route, getCurrentUrl } from 'preact-router';
import { updateStore } from '_unistore';
import { forgotCredentials, validateMobile } from '_mutations';
import { ButtonDescription } from '_components/core';
import { getTranslation, displayPageLoader } from '_helpers';
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
    displayPageLoader(true);
    validateMobile(this.state.mobile).then((res) => {
      if (res && !res.available) {
        let data = {
          mobile: this.state.mobile,
          settings: this.state.settings
        }
        forgotCredentials('sendotp', data).then((res) => {
          if (res.success) {
            route(`/${this.props.parent}/forgot-otp`);
          } else {
            this.showAlertBox(getTranslation('SOMETHING_WRONG'));
          }
        });
      } else {
        this.showAlertBox(getTranslation('MOBILE_NOT_FOUND'))
      }
      displayPageLoader(false);
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