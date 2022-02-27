import { Component } from 'preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { 
	ButtonDescription,
	FormGroup,
	FormInput
}  from '_components/core';
import { getTranslation } from '_helpers';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class DataPrivacy extends Component {
  constructor (props) {
    super(props);
		this.state = {
      isReading: true,
			// accepted: null
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
		route(`/${this.props.parent}/signup`);
	};
	
	onAcceptedChange = (value) => {
		this.setState({
			accepted: value
		});
	};

	renderContent = () => {
		return (
			<div className={style.termsContent}
			ref={(el) => {
				if (el) {
					this.el = el;
				}
			}}
			onScroll={this.checkIfRead}> 
				<p className={`bold ${style.heading}`}>

				PLEASE READ CAREFULLY THE FOLLOWING PRIVACY POLICY. THIS APPLIES TO ALL USERS OF THIS APP. IF YOU HAVE ANY QUESTIONS, COMMENTS, OR CONCERNS PLEASE CONTACT OUR DATA PRIVACY OFFICER USING THE CONTACT INFORMATION BELOW. USE OF THIS APP SIGNIFIES YOUR ACCEPTANCE OF THE TERMS OF OUR PRIVACY POLICY. IF YOU DO NOT AGREE TO THE PRIVACY POLICY BELOW AND/OR ANY REVISIONS TO SUCH POLICY, DO NOT PROVIDE US WITH YOUR PERSONAL DATA OR ACCESS THIS APP.
				</p>


				<p className={`bold ${style.heading}`}>PERSONAL DATA</p>
				<p>
					Kaya Natin (“Leni 2022 App” “we,” “us,” “our”) is committed to the protection of the personal information you provide to us (“Personal Data”). As you use our services and share information with us, we want to be clear on how we are using your information and the ways in which we protect your privacy. From time to time, we may update our Privacy Policy to reflect current changes in our policy and the law. When we do so, we will notify you by posting it on our Leni 2022 App for your information and reference. Please do take time to get to know our privacy policy and if you have questions, contact us at <a href="mailto:kayanatin2022@gmail.com">kayanatin2022@gmail.com</a>. 
				</p>

				<p className={`bold ${style.heading}`}>INFORMATION WE SHARE</p>
				<p>
					Subject to the provisions applicable under the Philippine law, your Personal Data may be made available to individual and/or entities associated with Kaya Natin as well as third-party service providers as part of our operations, promotions, and provision of services. The products and services available on Leni 2022 App, including but not limited to the sharing of your volunteer stories, organizing of any relevant campaign activities, may be distributed or provided by third party providers or hosted on their platforms, (collectively, the “Third Party Platforms”), which allows us to provide our products and services to you. 
				</p>
				<p>
					These Third Party Platforms are the customer data controller of, and are responsible for, all customer data collected on their respective platforms and in relation to their services. Any information you provide on the Third Party Platforms and linked to the mobile application is provided directly to the third party that operates such mobile application  and is subject to that Third Party Platform’s privacy policy. As such, you acknowledge and agree that Kaya Natin shall not be liable for any breach within or in relation to the Third Party Platforms, including but not limited to their collection, storage, processing and use of your Personal Data. 
				</p>

				<p>
				Your Personal Data is used, among others, for: 
				</p>
				<ul>
					<li>
					1. Organizing and campaigning efforts relevant to Presidential candidate Leni Robredo.
					</li>
					<li>
					2. Complying with the requirements of the law and legal processes, such as a court order or providing required reports and disclosures to the relevant regulators; to comply with a legal obligation, or to prevent imminent harm to public security, safety, or order. 
					</li>
					<li>
					3. Abide by any safety, public service, security, or legal requirements and processes. We will ask for your consent before we collect, process, use, or share your Personal Data for any other purpose other than the enumerated above, or when required by our Privacy Policy and the law. 
					</li>
				</ul>
				
				
				<p className={`bold ${style.heading}`}>ACCESSING AND UPDATING YOUR PERSONAL INFORMATION</p>
				<p>
					You have the right to reasonable access, modification, correction and removal of data collected in the Leni 2022 App, under the conditions stipulated by the Data Privacy Act of 2012 and other applicable rules and regulations, unless we have to keep that information for legitimate business or legal purposes. When updating your Personal Data, we may ask you to verify your identity before we can act on your request. We may reject requests that are unreasonably repetitive, require disproportionate technical effort (for example, developing a new system), risk the privacy of others or would be extremely impractical. 
				</p>
				<p>
					We can also provide information access and correction for free, except when it would require a disproportionate effort. Our aim is to maintain our services in a manner that protects information from accidental or malicious destruction. Upon deletion of your information from our services, we may not immediately delete residual copies from our active servers and backup systems. 
				</p>

				<p className={`bold ${style.heading}`}>YOUR RIGHTS AS DATA SUBJECTS</p>
				<p>
					As a data subject, you are entitled to exercise the following minimum rights to Kaya Natin and any third party engaged by Kaya Natin for sub-processing of your Personal Data, if applicable: 
				</p>
				<p>
					You have the right to be informed whether personal data pertaining to you shall be, are being, or have been processed, including the existence of automated decision-making and profiling. You will be notified and furnished with the information required by law before the entry of your Personal Data into such processing systems of Leni 2022 App or at the next practical opportunity. 
				</p>
				<p>
					You have the right to object to the processing of your Personal Data, automated processing, or profiling. You will be notified and given an opportunity to withhold consent in case of changes to the Personal Data, unless required under the law or as a legal obligation. In case of the exercise of this right, Kaya Natin shall no longer process the data unless it is one of the circumstances indicated by law. You have the right to reasonable access to, upon demand, on the following information: Contents of the Personal Data that are processed; sources from which the Personal Data were obtained; names and addresses of recipients of the Personal Data, manner by which such data were processed; reasons for the disclosure of the Personal Data to recipients, if any; information on any automated processes where data will or is likely to be made as sole basis for any decision that significantly affects or will affect the Personal Data owner; date when Personal Data concerning client were last accessed and modified; and Kaya Natin’s identity and address. 
				</p>
				<p>
					You have the right to dispute the inaccuracy or error in the Personal Data and have Kaya Natin correct it immediately and accordingly, unless the request is vexatious or otherwise unreasonable. If the Personal Data has been corrected, Kaya Natin shall ensure the accessibility of both the new and the retracted information and the simultaneous receipt of the new and the retracted information by the intended recipients thereof: Provided, That recipients or third parties who have previously received such processed personal data shall be informed of its inaccuracy and its rectification, upon reasonable request of the client. 
				</p>
				<p>
					You have the right to suspend, withdraw or order the blocking, removal or destruction of his or her personal data from Leni 2022 App’s filing system upon the conditions declared by law. 
				</p>
				<p>
					You have the right to be indemnified for any damages sustained due to such inaccurate, incomplete, outdated, false, unlawfully obtained or unauthorized use of personal data, taking into account any violation of your rights and freedoms as data subject. 
				</p>
				<p>
					Where your Personal Data is processed by electronic means and in a structured and commonly used format, then you have the right to obtain from Leni 2022 App and in a structured or commonly used format, a copy of such data in an electronic or structured format that is commonly used and allows for further use by client and in accordance with the provisions of law. 
				</p>

				<p className={`bold ${style.heading}`}>RETENTION</p>
				<p>
					Kaya Natin ensures your Personal Data is not kept longer than is necessary for the fulfillment of the purposes described in this Privacy Policy, or to meet legal obligations, and will subsequently be deleted or rendered anonymous. 
				</p>

				<p className={`bold ${style.heading}`}>SECURITY</p>
				<p>
					Kaya Natin applies reasonable arrangements and measures to safeguard the confidentiality of personal data. We regularly review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to our system and unauthorized alteration, disclosure, or destruction of information we hold. 
				</p>
				<p>
					We only permit your Personal Data to be collected, processed, used, and shared by our authorized employees, contractors, and subcontractors who hold such Personal Data under strict confidentiality and in accordance with their contractual obligations and who have implemented minimum security features against data leakage, unauthorized access, or disclosure. We restrict access to information to Kaya Natin members, contractors, and subcontractors who need to know such information in order to process it for us, who are subject to strict contractual and technical safeguards, and who are accountable if they fail to meet these obligations. 
				</p>
				<p>
					We only give you or your authorized representative access to your Personal Data. We do not provide, sell, or share your Personal Data to anyone unless you have given your express consent. We also do not use nor share your Personal Data with content and/or information providers without your prior request or consent. Personal Data will only be disclosed to third parties in accordance with this Privacy Policy. 
				</p>


				<p className={`bold ${style.heading}`}>ONLINE PRIVACY</p>
				<p>
					We use online data collection tools to evaluate the effectiveness of our Leni 2022 App, improve functionality and enhance security. Like many organizations, we gather data such as IP address, how users explore our app, information about a new or a repeat visit, application tabs the visitor explored, length of the visit and geographical location or similar details. All such information is collected in an aggregate form and is used to improve our mobile application’s functionality and performance, so we can create a better experience for our users. 
				</p>

				<p className={`bold ${style.heading}`}>DATA BREACHES </p>
				<p>
					Kaya Natin values your trust; hence, we will ensure to address all personal data breaches in relation to your Personal Data. 
				</p>
				<p>
					The standards for breach management implemented by Kaya Natin are guided by applicable law and regulation, including the Data Privacy Act of 2012 and its Implementing Rules and Regulations. 
				</p>
				<p>
					If you have information or have reason to believe that your Personal Data was unlawfully obtained, shared, disclosed, or used for unauthorized purposes, you may contact the Data Privacy Officer (DPO) of Leni 2022 App at <a href="mailto:kayanatin2022@gmail.com">kayanatin2022@gmail.com</a>.
				</p>



				<p className={`bold ${style.heading}`}>DATA PRIVACY OFFICER (DPO) </p>
				<p>
					Kaya Natin’s DPO ensures that it complies with requirements and obligations under the applicable data privacy laws, rules, and regulations. Any complaints or breaches must be communicated directly to the DPO. Should you wish not to have your Personal Data disclosed or processed, you may contact our DPO at <a href="mailto:kayanatin2022@gmail.com">kayanatin2022@gmail.com</a>.
				</p>



				{/* Input Cont */}
				{/* <div className={style.inputCont}>
					<FormInput
						name="accepted"
						type="radio"
						label={getTranslation('I_ACCEPT')}
						value="yes"
						id="yes"
						checked={this.state.accepted}
						onChange={(e) => {
							this.onAcceptedChange(e.target.value)
						}} />
				</div> */}
			</div>
		);
	}

	render = () => {
	  return (
	    <div className={style.termsWrapper}>
	      {this.renderContent()}
	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={this.handleContinue}
	          text="CONTINUE"
	          bottomDescription="PRIVACY_BOTTON_DESC"
	          isDisabled={this.state.isReading}
	        />
	      </div>
	    </div>
	  );
	};
}
export default DataPrivacy;
