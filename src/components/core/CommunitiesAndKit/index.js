/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import {
	ImageLoader,
	ButtonDescription,
	InitialSignup,
} from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';
import { fetchAppLandingConfig } from '_mutations';

// carousel
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// eslint-disable-next-line react/prefer-stateless-function
class CommunitiesAndKit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInitialSignupForm: false,
		};
	}

	componentDidMount = () => {
		fetchAppLandingConfig();
	};

	toggleSignupForm = () => {
		const { showInitialSignupForm } = this.state;
		this.setState({ showInitialSignupForm: !showInitialSignupForm });
	};

	// showPrivacyPolicy = () => {
	// 	route(`/${this.props.parent}/landing-data-privacy`);
	// };

	// showKayaNatin = () => {
	// 	route(`/${this.props.parent}/about-kaya-natin`);
	// };

	render = ({ toggleCommunitiesAndKit, isOpen, appLandingConfig }) => {
		const data = appLandingConfig.data;
		return (
			<div className={style.contentContainer}>
				{/* eslint-disable-next-line react/self-closing-comp */}
				<div
					onClick={toggleCommunitiesAndKit}
					className={isOpen ? style.contentOutside : null}
				>
				</div>
				<div className={isOpen ? `${style.comsAndKit} ${style.toggled}` : style.comsAndKit}>
					{/* Communities and Kit Content Starts Here */}
					<div className={style.communities}>
						<div className={style.communitiesContent}>
							<p className={`bold ${style.title}`}> {getTranslation('COMMUNITIES')} </p>
							<div className={style.community}>
								<ImageLoader
									src={data.event1.image}
									style={{ container: style.landingImg }}
									lazy
								/>
								<div className={style.communityContent}>
									<h4 className={`extraBold`}> {data.event1.title} </h4>
									<p className={`bold ${style.date}`}> {data.event1.date ? data.event1.date : null} </p>
									<p> {data.event1.body}{data.event1.body.length > 98 ? "..." : ""} </p>
								</div>
							</div>
							<div className={style.community}>
								<ImageLoader
									src={data.event2.image}
									style={{ container: style.landingImg }}
									lazy
								/>
								<div className={style.communityContent}>
									<h4 className={`extraBold`}> {data.event2.title} </h4>
									<p className={`bold ${style.date}`}> {data.event2.date ? data.event2.date : null} </p>
									<p> {data.event2.body}{data.event2.body.length > 98 ? "..." : ""} </p>
								</div>
							</div>
						</div>
						<div className={style.kitContent}>
							<p className={`bold ${style.title}`}> {getTranslation('KAKAMPINK_KIT')} </p>
							<Carousel
								showArrows={false}
								showStatus={false}
								showThumbs={false}
								className={`${style.customCarousel} ${style.customButton}`}
							>
								<div>
								<ImageLoader
									src="https://mobile-kkp.s3.ap-southeast-1.amazonaws.com/uploads/01FWD1CF8FEVNF5YG0ZFJWJF8H.png"
									style={{ container: style.kitImage }}
									lazy
								/>
								</div>
								<div>
								<ImageLoader
									src="https://mobile-kkp.s3.ap-southeast-1.amazonaws.com/uploads/01FWD1D4Z3RYF7M7H864873N7J.png"
									style={{ container: style.kitImage }}
									lazy
								/>
								</div>
							</Carousel>
						</div>
						<div className={style.signUpBtn}>
							<ButtonDescription
								onClickCallback={this.toggleSignupForm}   
								text={getTranslation('SIGNUP_BUTTON')}
								bottomDescription=""
							/>
							<div onClick={toggleCommunitiesAndKit}>
								<p className={style.backButton}> {getTranslation('BACK')} </p>
							</div>
							{/* <div className={style.privacyPolicy}>
								<a onClick={() => { this.showPrivacyPolicy() }}> {getTranslation('PRIVACY_POLICY')} </a> |
								<a onClick={() => { this.showKayaNatin() }}> {getTranslation('KAYA_NATIN')} </a>
							</div> */}
						</div>
					</div>
				</div>

				<InitialSignup
					isOpen={this.state.showInitialSignupForm}
					toggleSignupForm={this.toggleSignupForm}
					parent={this.props.parent}
				/>
			</div>
		);
	};
}

export default connect(['appLandingConfig', 'authUser'])(CommunitiesAndKit);
