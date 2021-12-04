import { Component } from 'preact';
import { getTranslation } from '_helpers';
import ButtonDescription from '_components/core/ButtonDescription';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class TermsConditions extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isReading: true
    };
  }

	checkIfRead = () => {
	  if (this.el) {
	    setTimeout(() => {
	      this.setState({
	        isReading: !(
	          this.el.scrollHeight - this.el.scrollTop ===
						this.el.clientHeight
	        )
	      });
	    }, 250);
	  }
	};

	handleContinue = (e) => {
	  console.log(e);
	};

	render = () => {
	  return (
	    <div className={style.termsWrapper}>
	      <div
	        className={style.termsContent}
	        dangerouslySetInnerHTML={{
	          __html: getTranslation('TERMS_COPY')
	        }}
	        ref={(el) => {
	          if (el) {
	            this.el = el;
	          }
	        }}
	        onScroll={this.checkIfRead}
	      />
	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={this.handleContinue}
	          text="Continue"
	          bottomDescription="By clicking continue, I accept the terms and conditions indicated herewith."
	          isDisabled={this.state.isReading}
	        />
	      </div>
	    </div>
	  );
	};
}
export default TermsConditions;
