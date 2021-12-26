import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation, displayPageLoader, circleModal } from '_helpers';
import { forgotCredentials } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { FormGroup, FormInput, ButtonDescription } from '_components/core';
import style from './style.scss';

let special_char = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// eslint-disable-next-line react/prefer-stateless-function
class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
      mobile: '',
			newPass: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
			confirmPass: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
		};
	};
	onNewPasswordChange = (value) => {
    if( value && special_char.test(value) ) {
      this.setState({
        newPass: {
          ...this.state.newPass,
          value,
          hasError: true,
          error: getTranslation('SPECIAL_CHARACTERS')
        }
      });
    } 
    else if (value && value.length < 8) {
			this.setState({
				newPass: {
					...this.state.newPass,
					value,
					hasError: true,
					error: getTranslation('MINIMUM_CHARACTERS')
				}
			});
		}
		else {
			this.setState({
				newPass: {
					...this.state.newPass,
					value,
					hasError: !value,
					error: !value ? 'REQUIRED' : ''
				}
			});
		}
	};
  onConfirmPasswordChange = (value) => {
		this.setState({
			confirmPass: {
				...this.state.confirmPass,
				value,
				hasError: !value,
				error: !value ? 'REQUIRED' : ''
			}
		});
	};

	handleContinue = (e) => {
		this.handleChangePassowrd()
	};

  handleChangePassowrd = () => {
    if (!this.state.newPass.value ||
      !this.state.confirmPass.value ||
      this.state.newPass.value.length < 8 ||
      special_char.test(this.state.newPass.value)) {
	    this.onNewPasswordChange(this.state.newPass.value);
      this.onConfirmPasswordChange(this.state.confirmPass.value);
	  } else {
      if ( this.state.confirmPass.value !== this.state.newPass.value ) {
        this.setState({
          confirmPass: {
            ...this.state.confirmPass,
            hasError: true,
            error: getTranslation('PASSWORD_UNMATCH')
          }
        });
      } else {
        let data = {
          ...this.props.forgot,
          otp: this.props.forgot.code,
          newPassword: this.state.newPass.value
        };
        forgotCredentials('changepw', data).then((res) => {
          if (res.success) {
            circleModal({
              title: getTranslation('CHANGE_PASS_SUCCESS'),
              content: getTranslation('SIGNIN_NEW_PASS')
            });
            route(`/${this.props.parent}`);
          }
        });
      }
    }
  }

  onNumberChange = (e) => {
    this.setState({
      mobile: e
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

  renderChangeForm = (newPass, confirmPass) => {
    return <form className={style.form}>
      <FormGroup label="New Password" hasError={newPass.hasError}>
        <FormInput
          className={style.fields}
          value={newPass.value}
          type="password"
          onBlur={(e) => {
            this.onNewPasswordChange(e.target.value)
          }}
          onInput={(e) => {
            this.onNewPasswordChange(e.target.value)
          }}
          hasError={newPass.hasError}
          error={newPass.error}
          message={newPass.message}
          />
      </FormGroup>
      <FormGroup label="Confirm Password" hasError={confirmPass.hasError}>
        <FormInput
          className={style.fields}
          value={confirmPass.value}
          type="password"
          onBlur={(e) => {
            this.onConfirmPasswordChange(e.target.value)
          }}
          onInput={(e) => {
            this.onConfirmPasswordChange(e.target.value)
          }}
          hasError={confirmPass.hasError}
          error={confirmPass.error}
          message={confirmPass.message}
          />
      </FormGroup>
    </form> 
  }

	render = ({}, { newPass, confirmPass }) => {
		return (
			<div className={style.forgotPassWrapper}>
				<div className={style.forgotPassContent}>
          <p className={style.title}>{getTranslation('CHANGE_PASSWORD')}</p>
          {this.renderChangeForm(newPass, confirmPass)}
				</div>

				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={this.handleContinue}
						text="Continue"
					/>
				</div>
			</div>
		);
	};
}
export default connect(['forgot'])(ForgotPassword);
