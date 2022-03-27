import { Component } from 'preact';
import { route, getCurrentUrl } from 'preact-router';
import { updateStore } from '_unistore';
import { forgotCredentials } from '_mutations';
import { ButtonDescription } from '_components/core';
import { getTranslation, getTraceID, displayPageLoader, showAlertBox } from '_helpers';
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
    updateStore({
      customBack: () => {
        route(`/${this.props.parent}/`, true);
      },
    });
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
      } else if (res.error === 'MOBILE_NOT_FOUND') {
        showAlertBox({
          message: res.error
        });
      } else if (res.error === 'MOBILE_NOT_ALLOWED') {
        showAlertBox({
          message: res.error
        });
      } else {
        const errorMessage = getTraceID(res)
        showAlertBox({
          message: errorMessage
        });
      }
    })
  }

  onKeyup = (e) => {
    this.setState({
      mobile: e.target.value,
    });
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
