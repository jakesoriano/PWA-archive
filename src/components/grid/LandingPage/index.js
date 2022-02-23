import { Component } from 'preact';
import { connect } from 'unistore/preact';
import {
	ImageLoader,
	ButtonDescription,
	InitialSignup,
	Login,
} from '_components/core';
import { getTranslation } from '_helpers';
import supportIcon from '../../../assets/icons/support_icon.png';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginForm: false,
      showInitialSignupForm: false
		};
	}

	toggleLoginForm = () => {
		const { showLoginForm } = this.state;
		this.setState({ showLoginForm: !showLoginForm });
	};

	toggleSignupForm = () => {
		const { showInitialSignupForm } = this.state;
		this.setState({ showInitialSignupForm: !showInitialSignupForm });
	};
  
  render = () => {
		return (
			<div className={style.landingPage}>
				<div>
					<div className={style.contentWrap}>
						<div className={style.leniLogo}>
							<div className={style.user}>
								<ImageLoader
									src="assets/images/appLogo.png"
									style={{ container: style.landingImg }}
									lazy
								/>
							</div>
						</div>
						<div className={style.signInUpBtnWrap}>
							<p>
								{getTranslation('SIGNIN_DESC')}
								<a
									className={`extraBold ${style.pClose}`}
									onClick={this.toggleLoginForm}
								>{getTranslation('SIGNIN')}</a>
							</p>
							<ButtonDescription
								onClickCallback={this.toggleSignupForm}		
								text={getTranslation('SIGNUP_BUTTON')}
								bottomDescription=""
							/>
              <a
                className={style.supportIcon}
                href="https://m.me/leni2022app"
                target="_blank"
                rel="noreferrer"
              >
                <img src={supportIcon} alt="support icon" />
              </a>
						</div>
					</div>
				</div>
				<Login
					isOpen={this.state.showLoginForm}
					toggleLoginForm={this.toggleLoginForm}
				/>
			
				<InitialSignup
					isOpen={this.state.showInitialSignupForm}
					toggleSignupForm={this.toggleSignupForm}
					parent={this.props.parent}
				/>
      </div>
    );
  }
}
export default connect(['authUser'])(LandingPage);
