import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { store, updateStore } from '_unistore';
import { 
  ButtonDescription,
  FormInput
}  from '_components/core';
import { getConfigByKey } from '_helpers';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class DataPrivacy extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isReading: true,
      accepted: false,
      accepted2: false,
      accepted3: false,
      accepted4: false,
    }
  }
	componentDidMount = () => {
	  updateStore({
	    customBack: () => {
	      route('/', true)
	    }
	  });
	};

	checkIfRead = () => {
	  if (this.el && this.state.isReading) {
	    setTimeout(() => {
	      try {
	        this.setState({
	          isReading: false
	        });
	      } catch (er) {
	        this.setState({
	          isReading: false
	        });
	      }
	    }, 250);
	  }
	};

	handleContinue = (e) => {
	  if (this.props.onAcceptCallback) {
	    this.props.onAcceptCallback();
	  } else {
	    let { signup } = store.getState();
	    updateStore({
			  signup: {
	        ...signup,
	        acceptedPrivacyPolicy: getConfigByKey('privacyPolicyVersion')
			  }
	    });
	    route(`/${this.props.parent}/signup`);
	  }
	};
	
	onAcceptedChange = (value) => {
	  this.setState({
	    accepted: value
	  });
	};

	showKayaNatin = () => {
	  route(`/${this.props.parent}/about-kaya-natin`);
	};

	renderContent = () => {
	  return (
	    <div className={`${style.termsContent} ${this.props.fromLandingPage ? style.landingTermsContent: ''}`}
	      ref={(el) => {
	        if (el) {
	          this.el = el;
	        }
	      }}
	      onScroll={this.checkIfRead}> 
	      <p className={`bold ${style.heading}`}> Privacy Policy Statement </p>
	      <p>
					We, at <a onClick={() => {
	          this.showKayaNatin() 
	        }}>Kaya Natin</a>, respect your privacy and commit to protect your personal information and sensitive personal information (collectively referred to as “Personal Data”) you provide in this Leni App. This Policy applies to KakamPink volunteers and community leaders who provide their Personal Data in this App. We may update this Privacy Policy Statement to reflect current changes in our policy, applicable election regulations and other laws. For any questions about your privacy, contact us at <a href="mailto:kayanatin2022@gmail.com">kayanatin2022@gmail.com</a>. 
	      </p>

	      <p className={`bold ${style.heading}`}> What Information We Collect </p>
	      <ol value="1">
	        <li>
	          <span className={`bold`}> Personal Information. </span> We collect your name and mobile number when you sign up to the Leni App so we can properly identify you.
	          <ol type="a">
	            <li>
								We may also collect referral code linkable to the KakamPink who invited you to the Leni App.
	            </li>
	            <li>
								For Filipinos located in foreign jurisdictions, we may ask for further personal information in order to comply with the Philippines election laws and foreign privacy regulations.
	            </li>
	          </ol>
	        </li>
	        <li>
	          <span className={`bold`}> Social Media Profile. </span> We collect your social media profile names if you voluntarily link the same upon registration. If you do so, the privacy policy of social media platforms will govern over processing of your personal data.
	        </li>
	        <li>
	          <span className={`bold`}> Campaign Stories. </span> We collect stories from KakamPinks who voluntarily share their activities and relevant campaign events within the platform. These stories may be distributed or shared through social media platforms. When you link your social media account with the Leni App, you acknowledge that the social media platforms’ privacy policy will be applicable over information you allow them to process.
	        </li>
	        <li>
	          <span className={`bold`}>Usage Data.</span> We collect information on your usage of the Leni App such as Internet Protocol address, how users explore and visit the app, and to the extent as mobile devices would allow, device information of the KakamPink app users.
	        </li>
	      </ol>

	      <p className={`bold ${style.heading}`}> Why We Process Your Information: </p>
	      <p> We process your information for the following purposes: </p>
	      <ol value="1">
	        <li>
						Verify my identity and prevent identity fraud;
	        </li>
	        <li>
						Create or update my volunteer information record;
	        </li>
	        <li>
						Organize and campaign efforts relevant to Presidential candidate Leni Robredo;
	        </li>
	        <li>
						Usage data is collected in an aggregate form and is used to improve the Leni App’s functionality and performance, so we can create a better experience for KakamPinks;
	        </li>
	        <li>
						Contact me regarding my volunteer activities and election offenses I may report through the Leni App;
	        </li>
	        <li>
						Communicate with me through the personal information, informing me of campaign events or news about Leni 2022, opportunities for services or volunteer work, and other similar communications;
	        </li>
	        <li>
						Enable Kaya Natin to determine whether I am qualified to be Community Leader or any privileged access I may be provided of;
	        </li>
	        <li>
						Administrative and other records keeping purposes;
	        </li>
	        <li>
						For such other purposes that would enable Kaya Natin to carry out its obligations under the law; or
	        </li>
	        <li>
						Comply with the requirements of the law and legal processes, such as a court order or providing required reports and disclosures to the relevant regulators; to comply with a legal obligation, or to prevent imminent harm to public security, safety, or order.
	        </li>
	      </ol>

	      <p className={`bold ${style.heading}`}> What are your Data Subject Rights </p>
	      <p> Under the Data Privacy Act of 2012, you have the following privacy rights: </p>
	      <ol value="1">
	        <li>
	          <span className={`bold`}> Right to be informed. </span> You may demand the details as to how your Personal Data is being processed or have been processed by Kaya Natin, including the existence of automated decision-making and profiling.
	        </li>
	        <li>
	          <span className={`bold`}> Right to access. </span> Upon written request, we can also provide information access and correction for free, except when it would require a disproportionate effort.
	        </li>
	        <li>
	          <span className={`bold`}> Right to dispute. </span> You may dispute inaccuracy or error in your Personal Data in the Leni App through our authorized representatives.
	        </li>
	        <li>
	          <span className={`bold`}> Right to object. </span> You may suspend, withdraw, and remove your Personal Data in certain further processing, upon demand.
	        </li>
	        <li>
	          <span className={`bold`}> Right to data erasure. </span> Based on reasonable grounds, you have the right to suspend, withdraw or order blocking, removal or destruction of your personal data from Leni App’s filing system, without prejudice to the Kaya Natin’s continuous processing for operational, legal, and regulatory purposes. Upon deletion of your information, we may not immediately delete residual copies from our active servers and backup systems.
	        </li>
	        <li>
	          <span className={`bold`}> Right to data portability. </span> You have the right to obtain from the Leni App your Personal Data in an electronic or structured format that is commonly used and allows for further use.
	        </li>
	        <li>
	          <span className={`bold`}> Right to be indemnified for damages. </span> As a data subject, you have the right to be indemnified for any damages sustained due to such violation of your right to privacy through inaccurate, false, unlawfully obtained or unauthorized use of your information.
	        </li>
	        <li>
	          <span className={`bold`}> Right to file a complaint. </span> You may file your complaint or any concerns with our Data Protection Officer at <a href="mailto:kayanatin2022@gmail.com">kayanatin2022@gmail.com</a> and/or with the National Privacy Commission through www.privacy.gov.ph
	        </li>
	      </ol>

	      <p className={`bold ${style.heading}`}> How Long We Retain Your Data </p>
	      <p>
					Kaya Natin ensures your Personal Data is not kept longer than is necessary for the fulfillment of the purposes described in this Privacy Policy, or to meet legal obligations, and will subsequently be deleted or rendered anonymous.
	      </p>

	      <p className={`bold ${style.heading}`}> How We Secure Your Data </p>
	      <p>
					Kaya Natin applies reasonable arrangements and measures to safeguard the confidentiality of your Personal Data. We regularly review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to our system and unauthorized alteration, disclosure, or destruction of information we hold. We only permit your Personal Data to be collected, processed, used, and shared by our authorized employees, contractors, and subcontractors who hold such Personal Data under strict confidentiality and in accordance with their contractual obligations and who have implemented minimum security features against data leakage, unauthorized access, or disclosure.
	      </p>

	      {/* Input Cont */}
	      {this.props.fromLandingPage ? null : (
	        <>
	          <p style={{ margin: "30px 0 10px" }}> This is to confirm that: </p>
	          <div className={style.inputCont}>
	            <FormInput
	              name="accepted"
	              type="radio"
	              label="The information I provided is true and correct."
	              value="yes"
	              id="accepted"
	              checked={this.state.accepted}
	              onChange={(e) => {
	                this.setState({
	                  accepted: true
	                })
	              }} 
	            />
	            <FormInput
	              name="readCondition"
	              type="radio"
	              label="I have read this Privacy Policy Statement and Terms and Conditions"
	              value="yes"
	              id="readCondition"
	              checked={this.state.accepted2}
	              onChange={() => {
	                this.setState({
	                  accepted2: true
	                })
	              }} 
	            />
	            <FormInput
	              name="accepted3"
	              type="radio"
	              label="I acknowledge that this Leni App is created by Kaya Natin volunteers in the spirit of bayanihan where volunteers like me give support to like-minded supporters in the context of political speech."
	              value="yes"
	              id="accepted3"
	              checked={this.state.accepted3}
	              onChange={(e) => {
	                this.setState({
	                  accepted3: true
	                })
	              }} 
	            />
	            <FormInput
	              name="accepted4"
	              type="radio"
	              label="I warrant and represent that I am a Filipino citizen, and that I am committed to obey the Philippine election laws, as well as report any violation thereto."
	              value="yes"
	              id="accepted4"
	              checked={this.state.accepted4}
	              onChange={(e) => {
	                this.setState({
	                  accepted4: true
	                })
	              }} 
	            />
	          </div>
	        </>
	      )}
	    </div>
	  );
	}

	render = (props) => {
	  return (
	    <div
	      className={`${style.termsWrapper} ${props?.style}`}
	    >
	      {this.renderContent()}
	      <div className={style.buttonContainer}>
	        {this.props.fromLandingPage ? null : (
	          <ButtonDescription
	            onClickCallback={this.handleContinue}
	            text="CONTINUE"
	            bottomDescription="PRIVACY_BOTTON_DESC"
	            isDisabled={
	              !this.state.accepted ||
						!this.state.accepted2 ||
						!this.state.accepted3 ||
						!this.state.accepted4
	            }
	            buttonStyle={`${style.buttonStyle}`}
	          />
	        )}
	      </div>
	    </div>
	  );
	};
}
export default DataPrivacy;
