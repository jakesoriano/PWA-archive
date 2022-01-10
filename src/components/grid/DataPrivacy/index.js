import { Component } from 'preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import { ButtonDescription }  from '_components/core';
import { getTranslation } from '_helpers';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class DataPrivacy extends Component {
  constructor (props) {
    super(props);
  }
	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route('/landing/terms', true)
			}
		});
	};

	handleContinue = (e) => {
		route(`/${this.props.parent}/signup`);
	};

	renderContent = () => {
		return (
			<div className={style.termsContent}> 
				<p className={`bold ${style.heading}`}>{getTranslation('CONSENT')}</p>
				<p>
				In submitting this form I agree to my details being used for the purposes of security compliance, data gathering for research, sending information about organized events and other activities, and sharing of testimonials. The information will only be accessed by necessary Leni 2022 staff. I understand my data will be held securely and will not be distributed to third parties. I have a right to change or access my information. I understand that when this information is no longer required for this purpose, official university procedure will be followed to dispose of my data.
				</p>
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
	        />
	      </div>
	    </div>
	  );
	};
}
export default DataPrivacy;
