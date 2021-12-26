/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from 'preact';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { getTranslation, displayPageLoader } from '_helpers';
import { ImageLoader, FormGroup, FormInput, ButtonDescription } from '_components/core';
import { login } from '_mutations';
import { route } from 'preact-router';
import {
  nativeSetCredential,
  nativeLoginWithTouchID,
  nativeSigninFacebook,
  nativeSigninTwitter,
  nativeSigninGoogle,
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
          if (res) {
            if (!isAuto) {
              nativeSetCredential(payload);
            }
            route('/home', true);
          } else {
            updateStore({
              alertShow: {
                success: false,
                content: getTranslation(errMessage || 'INVALID_USER_PASS'),
                noTopBar: true
              }
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
	  console.log('click onClickForgotUserPass');
	};

	onClickSocMedSignin = () => {
	  console.log('click social media');
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
        : nativeSigninGoogle()
      )
    )
      .then(res => {
        if(res.success) {
          // submit data
          this.onLogin({
            username: res.data.email,
            password: res.data.id
          }, true, 'ACCOUNT_NOT_FOUND');
        } else {
          updateStore({
            alertShow: {
              success: false,
              content: getTranslation('ACCOUNT_NOT_FOUND'),
              noTopBar: true
            }
          });
        }
      })
      .catch(err => {
        updateStore({
          alertShow: {
            success: false,
            content: getTranslation('SOMETHING_WRONG'),
            noTopBar: true
          }
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
              <FormGroup label="Username" hasError={username.hasError}>
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
              <FormGroup label="Password" hasError={password.hasError}>
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
                  onClickCallback={() => {
                    this.onClickSubmit()
                  }}
                  text={getTranslation('LOGIN_SUBMIT')}
                  bottomDescription=""
                />
                <a
                  className={style.forgotUserPass}
                  onClick={this.onClickForgotUserPass}
                >
                  {getTranslation('FORGOT_USER_PASS')}
                </a>
              </div>
              <div className={style.socialMedia}>
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
