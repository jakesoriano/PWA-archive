import { Component } from 'preact';
import { route } from 'preact-router';
import { getTranslation } from '_helpers';
import { changePassword } from '_mutations';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { FormGroup, FormInput, ButtonDescription } from '_components/core';
import style from './style.scss';

let special_char = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// eslint-disable-next-line react/prefer-stateless-function
class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPass: {
				value: '',
				error: '',
				message: '',
				hasError: false
			},
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
	onCurrentPasswordChange = (value) => {
		this.setState({
			currentPass: {
				...this.state.currentPass,
				value,
				hasError: !value,
				error: !value ? 'REQUIRED' : ''
			}
		});
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

	showAlertBox = (message, hasError) => {
		updateStore({
			alertShow: {
				success: !hasError,
				content: message
			}
		});
		setTimeout(() => {
			updateStore({
				alertShow: null
			});
		}, 5000);
	}

	handleContinue = (e) => {
		if (!this.state.currentPass.value || 
      !this.state.newPass.value ||
      !this.state.confirmPass.value ||
      this.state.newPass.value.length < 8 ||
      special_char.test(this.state.newPass.value)) {
	    this.onCurrentPasswordChange(this.state.currentPass.value);
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
				const data = {
					password: this.state.currentPass.value,
					newPassword: this.state.newPass.value,
				};
				// displayPageLoader(true);
				changePassword(data).then((res) => {
					if(res && res.success) {
						this.showAlertBox('CHANGE_PASS_SUCCESS', false);
					} else {
						this.showAlertBox('SOMETHING_WRONG', true);
					}
					// displayPageLoader(false);
					route(`/${this.props.parent}`);
				}).catch((err) => {
					this.showAlertBox('SOMETHING_WRONG', true);
					// displayPageLoader(false);
					route(`/${this.props.parent}`);
				});
				
      }
    }
	};

	render = ({}, { currentPass, newPass, confirmPass }) => {
		return (
			<div className={style.changePassWrapper}>
				<div className={style.changePassContent}>
					<form className={style.form}>
						<FormGroup label="Current Password" hasError={currentPass.hasError}>
							<FormInput
								className={style.fields}
								value={currentPass.value}
								type="text"
								onBlur={(e) => {
									this.onCurrentPasswordChange(e.target.value)
								}}
								onInput={(e) => {
									this.onCurrentPasswordChange(e.target.value)
								}}
								hasError={currentPass.hasError}
								error={currentPass.error}
								message={currentPass.message}
								/>
						</FormGroup>
						<FormGroup label="New Password" hasError={newPass.hasError}>
							<FormInput
								className={style.fields}
								value={newPass.value}
								type="text"
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
								type="text"
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
				</div>

				<div className={style.buttonContainer}>
					<ButtonDescription
						onClickCallback={() => {
							this.handleContinue()
						}}
						text="Continue"
					/>
				</div>
			</div>
		);
	};
}
export default connect(['authUser'])(ChangePassword);
