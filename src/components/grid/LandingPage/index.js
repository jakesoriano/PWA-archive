import { Component } from 'preact';
import { connect } from 'unistore/preact';
import {
	ImageLoader,
	ButtonDescription,
	InitialSignup,
	Login,
	NewLandingPage,
} from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';
import { fetchAppLandingConfig } from '_mutations';

// eslint-disable-next-line react/prefer-stateless-function
class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginForm: false,
      showInitialSignupForm: false
		};
	}

	componentDidMount = () => {
		fetchAppLandingConfig();
	};

	toggleLoginForm = () => {
		const { showLoginForm } = this.state;
		this.setState({ showLoginForm: !showLoginForm });
	};

	toggleSignupForm = () => {
		const { showInitialSignupForm } = this.state;
		this.setState({ showInitialSignupForm: !showInitialSignupForm });
	};
  
	render = ({appLandingConfig}) => {
		const data = appLandingConfig.data;
		return (
			<>
				{!data.length ? 
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
										buttonStyle={`${style.buttonStyle}`}
									/>
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
				:
					<NewLandingPage/>
				}
			</>
		);
	}
}
export default connect(['appLandingConfig', 'authUser'])(LandingPage);
