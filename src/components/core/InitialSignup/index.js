/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { getTranslation, displayPageLoader, showAlertBox } from '_helpers';
import { validateUsername } from '_mutations';
import { ImageLoader, FormGroup, FormInput, ButtonDescription } from '_components/core';
import {
  nativeSigninFacebook,
  nativeSigninTwitter,
  nativeSigninGoogle,
  nativeSigninApple,
} from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

let special_char = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// eslint-disable-next-line react/prefer-stateless-function
class InitialSignup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: {
        value: '',
        error: '',
        message: '',
        hasError: false
      },
      password: {
        value: '',
        error: '',
        message: '',
        hasError: false
      },
      confirm_password: {
        value: '',
        error: '',
        message: '',
        hasError: false
      }
    };
  }
	onClickSubmit = () => {
    if (!this.state.username.value || 
      this.state.username.hasError || 
      !this.state.password.value ||
      !this.state.confirm_password.value ||
      this.state.password.value.length < 8) {
	    this.onUsernameChange(this.state.username.value);
	    this.onPasswordChange(this.state.password.value);
      this.onConfirmPasswordChange(this.state.confirm_password.value);
	  } else {
      if ( this.state.confirm_password.value !== this.state.password.value ) {
        this.setState({
          confirm_password: {
            ...this.state.confirm_password,
            hasError: true,
            error: getTranslation('PASSWORD_UNMATCH')
          }
        });
      } else {
        displayPageLoader(true);
        validateUsername(this.state.username.value)
          .then((res) => {
            displayPageLoader(false);
            if (res.available) {
              this.props.toggleSignupForm();
              updateStore({
                signup: {
                  username: this.state.username.value,
                  password: this.state.password.value,
                  socType: 'U',
                  socId: ''
                }
              });
              route(`/${this.props.parent}/data-privacy`);
            } else {
              this.setState({
                username: {
                  ...this.state.username,
                  hasError: true,
                  error: getTranslation('USERNAME_UNAVAILABLE')
                }
              });
            }
          })
      }
    }
	};

  onUsernameChange = (value) => {
    // check for special characters
    if( value && special_char.test(value) ) {
      this.setState({
        username: {
          ...this.state.username,
          value,
          hasError: true,
          error: getTranslation('SPECIAL_CHARACTERS')

        }
      });
    } else {
      this.setState({
        username: {
          ...this.state.username,
          value,
          hasError: !value,
          error: !value ? 'REQUIRED' : ''
        }
      });
    }
	};
  onPasswordChange = (value) => {
    if (value && value.length < 8) {
      this.setState({
        password: {
          ...this.state.password,
          value,
          hasError: true,
          error: getTranslation('MINIMUM_CHARACTERS')
        }
      });
    } else {
      this.setState({
        password: {
          ...this.state.password,
          value,
          hasError: !value,
          error: !value ? 'REQUIRED' : ''
        }
      });
    }
   
	};
  onConfirmPasswordChange = (value) => {
	  this.setState({
	    confirm_password: {
	      ...this.state.confirm_password,
	      value,
	      hasError: !value,
	      error: !value ? 'REQUIRED' : ''
	    }
	  });
	};

  onClickSocial = (type) => {
    (type == 'F' 
      ? nativeSigninFacebook() 
      : (type === 'T' 
        ? nativeSigninTwitter() 
        : (type === 'A' 
          ? nativeSigninApple() 
          : nativeSigninGoogle()
        )
      )
    )
      .then(res => {
        if(res.success) {
        const data = res.data;
        // validate username
        displayPageLoader(true);
        validateUsername(data.email)
          .then((res) => {
            displayPageLoader(false);
            if (res.available) {
              this.props.toggleSignupForm();
              updateStore({
                signup: {
                  username: (data.email || '').toString(),
                  password: (data.id || '').toString(),
                  fname: data.fname,
                  lname: data.lname,
                  socId: (data.id || '').toString(),
                  socType: type
                }
              });
              route(`/${this.props.parent}/data-privacy`);
            } else {
              showAlertBox({
                message: 'ACCOUNT_EXIST',
                noTopBar: true
              });
            }
          });
        } else if (res.error !== 'SIGN_IN_CANCELLED') {
            showAlertBox({
              message: typeof res.error === 'string' ? res.error : 'SOMETHING_WRONG',
              noTopBar: true
            });
        }
      })
      .catch(err => {
        showAlertBox({
          message: 'SOMETHING_WRONG',
          noTopBar: true
        });
      })
  };

  renderSocialMedia = () => {
    if (process.env.PLATFORM === 'ios' &&
      this.props.nativeVersion &&
      parseInt(this.props.nativeVersion.replace(/\./gim, '')) < 110) {
      return null;
    }
    return (
      <div className={`${style.socialMedia}`}>
        <p>{getTranslation('SOCIAL_MEDIA')}</p>
        <ul>
          <li>
            <a onClick={() => {
                this.onClickSocial('F');
              }}>
              <ImageLoader
              src="assets/images/fb_icon.png"
              style={{ container: style.socMedIcons }}
              />
            </a>
          </li>
          <li>
            <a onClick={() => {
                this.onClickSocial('T');
              }}>
              <ImageLoader
              src="assets/images/twitter_icon.png"
              style={{ container: style.socMedIcons }}
              />
            </a>
          </li>
          <li>
            <a onClick={() => {
                this.onClickSocial('G');
              }}>
              <ImageLoader
              src="assets/images/google_icon.png"
              style={{ container: style.socMedIcons }}
              />
            </a>
          </li>
          {process.env.PLATFORM === 'ios' && (
          <li>
            <a className={style.appleLogo} 
              onClick={() => {
                this.onClickSocial('A');
              }}>
              <ImageLoader
              src="assets/images/apple_icon.png"
              style={{ container: style.socMedIcons }}
              />
            </a>
          </li>
          )}
        </ul>
      </div>
    );
  };

	render = (
	  { toggleSignupForm, isOpen },
	  { username, password, confirm_password }
	) => {
	  return (
	    <div className={style.signupFormContainer}>
	      {/* eslint-disable-next-line react/self-closing-comp */}
	      <div
	        onClick={toggleSignupForm}
	        className={isOpen ? style.signupOutside : null}
	      >
	      </div>
	      <div
	        className={isOpen ? `${style.signup} ${style.toggled}` : style.signup}
	      >
	        {/* Initial Signup Contents Here */}
          <div className={style.formTitle}>
            <p className={`extraBold ${style.formTitle}`}>
              {getTranslation('WELCOME')} <span className={`extraBold`}>{getTranslation('KAKAMPINK')}</span> <br/>
              {getTranslation('JOIN_US')}
            </p>
          </div>
          <div className={style.formFieldWrap}>
            <form className={style.form}>
            <FormGroup label="Username" hasError={username.hasError}>
              <FormInput
              value={username.value}
              type="text"
              onBlur={(e) => {
                this.onUsernameChange(e.target.value)
              }}
              onInput={(e) => {
                this.onUsernameChange(e.target.value)
              }}
              hasError={username.hasError}
              error={username.error}
              message={username.message}
              />
            </FormGroup>
            <FormGroup label="Password" hasError={password.hasError}>
              <FormInput
              value={password.value}
              type="password"
              onBlur={(e) => {
                this.onPasswordChange(e.target.value)
              }}
              onInput={(e) => {
                this.onPasswordChange(e.target.value)
              }}
              hasError={password.hasError}
              error={password.error}
              message={password.message}
              />
            </FormGroup>
            <FormGroup
              label="Confirm Password"
              hasError={confirm_password.hasError}
            >
              <FormInput
              value={confirm_password.value}
              type="password"
              onBlur={(e) => {
                this.onConfirmPasswordChange(e.target.value)
              }}
              onInput={(e) => {
                this.onConfirmPasswordChange(e.target.value)
              }}
              hasError={confirm_password.hasError}
              error={confirm_password.error}
              message={confirm_password.message}
              />
            </FormGroup>
            <div className={style.buttonWrap}>
              <ButtonDescription
              onClickCallback={this.onClickSubmit}
              text={getTranslation('SIGNUP_CONTINUE')}
              bottomDescription=""
              />
              <div onClick={toggleSignupForm}>
                <p className={style.backButton}> {getTranslation('BACK')} </p>
              </div>
            </div>
            </form>
              
            {/* Social Media */}
            {this.renderSocialMedia()}
          </div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['signup', 'nativeVersion'])(InitialSignup);
