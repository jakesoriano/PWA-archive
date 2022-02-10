/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from 'preact';
import { Link } from 'preact-router/match';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { getTranslation, displayPageLoader, showAlertBox } from '_helpers';
import { ImageLoader, FormGroup, FormInput, ButtonDescription } from '_components/core';
import { login } from '_mutations';
import { route } from 'preact-router';
import {
  nativeSetCredential,
  nativeLoginWithTouchID,
  nativeSigninFacebook,
  nativeSigninTwitter,
  nativeSigninGoogle,
  nativeSigninApple,
} from '_platform/helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: {
        value: props.login ? props.login.username : '',
        error: '',
        message: '',
        hasError: false
      },
      password: {
        value: props.login ? props.login.password : '',
        error: '',
        message: '',
        hasError: false
      }
    };
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.isOpen && prevProps.isOpen !== this.props.isOpen) {
      nativeLoginWithTouchID()
        .then(res => {
          if (res) {
            this.onLogin({
              username: res.username,
              password: res.password
            }, true);
          }
        });
    }
  }

  onLogin = (payload, isAuto, errMessage) => {
    displayPageLoader(true);
	    login(payload)
	      .then((res) => {
          displayPageLoader(false);
          /**
           * 1. login success
           * 2. login require otp
           * 3. login fail
           */
          if (res === true) {
            if (!isAuto) {
              nativeSetCredential(payload);
            }
            route('/home', true);
          } else if (res.otp) {
            updateStore({
              loginInfo: {
                username: payload.username,
                password: payload.password,
                mobile: res.mobile,
                isAuto
              }
            }, true);
            this.props.toggleLoginForm();
            route(`/landing/login-otp`);
          } else {
            showAlertBox({
              message: errMessage || 'INVALID_USER_PASS',
              noTopBar: true
            });
          }
	      })
	      .catch((err) => {
          displayPageLoader(false);
	      });
  }

	onClickSubmit = () => {
	  if (!this.state.username.value || !this.state.password.value) {
	    this.onUsernameChange(this.state.username.value);
	    this.onPasswordChange(this.state.password.value);
	  } else {
      this.onLogin({
        username: this.state.username.value,
        password: this.state.password.value
	    });
	  }
	};

	onClickForgotUserPass = () => {
    this.props.toggleLoginForm();
	};

	onUsernameChange = (value) => {
	  this.setState({
	    username: {
	      ...this.state.username,
	      value,
	      hasError: !value,
	      error: !value ? 'REQUIRED' : ''
	    }
	  });
	};

	onPasswordChange = (value) => {
	  this.setState({
	    password: {
	      ...this.state.password,
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
          // submit data
          this.onLogin({
            username: res.data.email,
            password: res.data.id
          }, true, 'ACCOUNT_NOT_FOUND');
        } else if (res.error !== 'SIGN_IN_CANCELLED') {
          showAlertBox({
            message: 'ACCOUNT_NOT_FOUND',
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

	render = ({ toggleLoginForm, isOpen }, { username, password }) => {
	  return (
	    <div className={style.loginFormContainer}>
	      {/* eslint-disable-next-line react/self-closing-comp */}
	      <div
	        onClick={toggleLoginForm}
	        className={isOpen ? style.loginOutside : null}
	      >
	      </div>
	      <div
	        className={isOpen ? `${style.login} ${style.toggled}` : style.login}
	      >
	        {/* Login Contents Here */}
          <div className={style.formTitle}>
            <p className={`${style.formTitle}`}>
              {getTranslation('JOIN_US')}
            </p>
          </div>
          <div className={style.formFieldWrap}>
            <form className={style.form}>
              <FormGroup label="USERNAME" hasError={username.hasError}>
                <FormInput
                  className={style.fields}
                  style={{ error: style.fields }}
                  value={username.value}
                  type="text"
                  onBlur={(e) => {
                    this.onUsernameChange(e.target.value);
                  }}
                  onInput={(e) => {
                    this.onUsernameChange(e.target.value);
                  }}
                  hasError={username.hasError}
                  error={username.error}
                  message={username.message}
                />
              </FormGroup>
              <FormGroup label="PASSWORD" hasError={password.hasError}>
                <FormInput
                  className={style.fields}
                  style={{ error: style.fields }}
                  value={password.value}
                  type="password"
                  onBlur={(e) => {
                    this.onPasswordChange(e.target.value);
                  }}
                  onInput={(e) => {
                    this.onPasswordChange(e.target.value);
                  }}
                  hasError={password.hasError}
                  error={password.error}
                  message={password.message}
                />
              </FormGroup>
              <div className={style.buttonWrap}>
                <ButtonDescription
                  onClickCallback={(e) => {
                    e.stopPropagation();
                    this.onClickSubmit()
                  }}
                  text={getTranslation('LOGIN_SUBMIT')}
                  bottomDescription=""
                />
                <p
                  className={`bold ${style.forgotUserPass}`}
                  // onClick={this.onClickForgotUserPass}
                >
                  {getTranslation('FORGOT')}&nbsp;
                    <Link class={`bold`} href={`/landing/enter-mobile-un`} 
                        className={style.sMItem}
                        onClick={this.onClickForgotUserPass}>{getTranslation('USERNAME')}</Link>
                  &nbsp;<span>{getTranslation('OR')}</span>&nbsp;
                    <Link class={`bold`} href={`/landing/enter-mobile-pw`} 
                        className={style.sMItem}
                        onClick={this.onClickForgotUserPass}>{getTranslation('PASSWORD')}</Link>
                </p>
              </div>
              
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
            </form>
          </div>
	      </div>
	    </div>
	  );
	};
}

export default connect(['authUser'])(Login);
