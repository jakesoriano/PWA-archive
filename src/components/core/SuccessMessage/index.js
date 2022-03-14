import { h, Component, createRef } from 'preact';
import { successMessage, getTranslation } from '_helpers';
import { ImageLoader, ButtonDescription } from '_components/core';
import { Link } from 'preact-router/match';
// eslint-disable-next-line import/extensions
import style from './style';

class SuccessMessage extends Component {
	ref = createRef();

	handleBack = (cb) => {
	  // if (this.ref.current) {
	  //   this.ref.current && this.ref.current.classList.remove(style.animate);
	  //   this.ref.current && this.ref.current.classList.add(style.close);
	  //   setTimeout(cb, 400);
	  // } else {
	  //   cb();
	  // }
	  successMessage(null);
	};

	componentDidMount = () => {
	  if (this.ref.current) {
	    setTimeout(() => {
	      this.ref.current && this.ref.current.classList.add(style.animate);
	    }, 0);
	  }
	};

	render = ({ pageTitle, title, message }) => (
	  <div
	    className={`${style.popupPage} ${style.noAnimate}`}
	  >
	    <div className={style.header}>
	      <button
	        className="icon-back clickable"
	        onClick={() => {
	          this.handleBack();
	        }}
	      >
	        <ImageLoader
	          style={{ container: style.backImg }}
	          src="assets/images/downarrow.png"
	        /> 
	      </button>
	      <h3 className={`extraBold`}>{getTranslation(pageTitle)}</h3>
	    </div>
	    <div className={style.body}>
	      <ImageLoader
	          style={{ container: style.sIcon }}
	          src="assets/images/icon_check_pink.png"
	        lazy
	        />
	      <h2>{getTranslation(title)}</h2>
	      <p>{getTranslation(message)}</p>
	      <div className={style.btnWrap}>
	        <ButtonDescription
	          onClickCallback={() => {
	            this.handleBack();
	          }}
	          text={getTranslation('GO_BACK')}
	          buttonStyle={`${style.buttonStyle}`}
	        />
	      </div>
	    </div>
	  </div>
	);
}
export default SuccessMessage;
