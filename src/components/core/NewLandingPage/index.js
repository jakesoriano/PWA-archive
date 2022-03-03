import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';

import {
	ImageLoader,
	ButtonDescription,
	InitialSignup,
	Login,
	CommunitiesAndKit
} from '_components/core';
import { getTranslation } from '_helpers';
import { fetchAppLandingConfig } from '_mutations';
import supportIcon from '../../../assets/icons/support_icon.png';
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class NewLandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginForm: false,
			showInitialSignupForm: false,
			showCommunitiesAndKit: false,
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

	toggleCommunitiesAndKit = () => {
		const { showCommunitiesAndKit } = this.state;
		this.setState({ showCommunitiesAndKit: !showCommunitiesAndKit });
	};
  
	showPrivacyPolicy = () => {
		route(`/landing/landing-data-privacy`);
	};

	showKayaNatin = () => {
		route(`/landing/about-kaya-natin`);
	};

	render = ({ appLandingConfig }) => {
		const data = appLandingConfig?.data;
		console.log("sarsa ", data);
		return (
			<div className={style.landingPage}>
				<div>
					<div className={style.contentWrap}>
						<div className={style.headline}>
							<div className={style.announcements}>
								<ImageLoader
									src={data?.headline1?.image}
									style={{ container: style.landingImg }}
									lazy
								/>
								<div className={style.announcementsContent}>
									<p className={`bold`}> {data?.headline1?.headline} </p>
									<h4 className={`extraBold`}> {data?.headline1?.title} </h4>
									<p className={`bold ${style.date}`}> {data?.headline1?.date} </p>
									<p> {data?.headline1?.body}{data?.headline1?.body.length > 98 ? "..." : ""} </p>
								</div>
							</div>
							<div className={style.heroPoints}>
								<ImageLoader
									src={data?.headline2?.image}
									style={{ container: style.heroPointsTotal }}
									lazy
								/>
								<div className={style.heroPointsContent}>
									<p className={`bold`}> {data?.headline2?.headline} </p>
									<h4 className={`extraBold`}> {data?.headline2?.title} </h4>
									<p className={`bold ${style.date}`}> {data?.headline2?.date} </p>
									<p> {data?.headline2?.body}{data?.headline2?.body.length > 98 ? "..." : ""} </p>
								</div>
							</div>
						</div>
						<div className={style.partners}>
							<p> {getTranslation('TRUSTED_BY')} </p>
							<div className={`${style.partnerImages} ${data?.trusted_by?.length > 3 ? style.partnerImagesScroll : ""}`}>
								{data?.trusted_by?.map(function(image, i){
									return (
										<ImageLoader
											src={image}
											style={style.landingImg}
											lazy
										/>
									)}
								)}
							</div>
						</div>
						<div className={style.signInUpBtnWrap}>
							<p>
								{getTranslation('SIGNIN_DESC')}
								<a onClick={this.toggleLoginForm}>
									{getTranslation('SIGNIN')}
								</a>
							</p>
							<ButtonDescription
								onClickCallback={this.toggleSignupForm}   
								text={getTranslation('SIGNUP_BUTTON')}
								buttonStyle={`${style.buttonStyle}`}
								bottomDescription=""
							/>
							<ButtonDescription
								onClickCallback={this.toggleCommunitiesAndKit}   
								text={getTranslation('COMMUNITIES_AND_KIT')}
								buttonStyle={`${style.buttonStyle}`}
								bottomDescription=""
							/>
							<div className={style.privacyPolicy}>
								<a onClick={() => { this.showPrivacyPolicy() }}> {getTranslation('PRIVACY_POLICY')} </a> |
								<a onClick={() => { this.showKayaNatin() }}> {getTranslation('KAYA_NATIN')} </a>
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

				<CommunitiesAndKit
					isOpen={this.state.showCommunitiesAndKit}
					toggleCommunitiesAndKit={this.toggleCommunitiesAndKit}
				/>
			</div>
		);
	}
}
export default connect(['appLandingConfig', 'authUser'])(NewLandingPage);
