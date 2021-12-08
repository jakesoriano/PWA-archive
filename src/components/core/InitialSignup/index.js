/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { updateStore } from '_unistore';
import { getTranslation } from '_helpers';
import { ImageLoader, FormGroup, FormInput, ButtonDescription } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

let special_char = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// eslint-disable-next-line react/prefer-stateless-function
class InitialSignup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: {
        value: props.initialSignup ? props.initialSignup.username : '',
        error: '',
        message: '',
        hasError: false
      },
      password: {
        value: props.initialSignup ? props.initialSignup.password : '',
        error: '',
        message: '',
        hasError: false
      },
      confirm_password: {
        value: props.initialSignup ? props.initialSignup.confirm_password : '',
        error: '',
        message: '',
        hasError: false
      }
    };
  }
	onClickSubmit = () => {
    if (!this.state.username.value || 
      !this.state.password.value ||
      !this.state.confirm_password.value ||
      this.state.password.value.length < 8 ||
      special_char.test(this.state.password.value)) {
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
        updateStore({
          signup: {
            username: this.state.username.value,
            password: this.state.password.value
          }
        });
        route('/terms');
      }
    }
	};

	onClickSocMedSignin = () => {
	  console.log('click social media');
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
    if( value && special_char.test(value) ) {
      this.setState({
        password: {
          ...this.state.username,
          value,
          hasError: true,
          error: getTranslation('SPECIAL_CHARACTERS')
        }
      });
    } 
    else 
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
              className={style.fields}
              style={{ error: style.fields }}
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
              className={style.fields}
              style={{ error: style.fields }}
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
            </div>
            </form>
            <div className={style.socialMedia}>
              <p>{getTranslation('SOCIAL_MEDIA')}</p>
              <ul>
                <li>
                <a onClick={this.onClickSocMedSignin}>
                  <ImageLoader
                  src="assets/images/fb_icon.png"
                  style={{ container: style.socMedIcons }}
                  />
                </a>
                </li>
                <li>
                <a onClick={this.onClickSocMedSignin}>
                  <ImageLoader
                  src="assets/images/twitter_icon.png"
                  style={{ container: style.socMedIcons }}
                  />
                </a>
                </li>
                <li>
                <a onClick={this.onClickSocMedSignin}>
                  <ImageLoader
                  src="assets/images/google_icon.png"
                  style={{ container: style.socMedIcons }}
                  />
                </a>
                </li>
              </ul>
            </div>
          </div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(InitialSignup);
