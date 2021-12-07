/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { getTranslation, dateLastLoginFormat } from '_helpers';
import { ImageLoader, FormGroup, FormInput, ButtonDescription } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

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
	  console.log('click submit');
	};

	onClickSocMedSignin = () => {
	  console.log('click social media');
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
                // this.onFnameChange(e.target.value)
              }}
              onInput={(e) => {
                // this.onFnameChange(e.target.value)
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
              type="text"
              onBlur={(e) => {
                // this.onFnameChange(e.target.value)
              }}
              onInput={(e) => {
                // this.onFnameChange(e.target.value)
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
              type="text"
              onBlur={(e) => {
                // this.onFnameChange(e.target.value)
              }}
              onInput={(e) => {
                // this.onFnameChange(e.target.value)
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
