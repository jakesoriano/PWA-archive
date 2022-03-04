import { Component } from 'preact';
import { updateStore } from '_unistore';
import { getTranslation, showAlertBox } from '_helpers';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default class AlertBox extends Component {
  isMounted = false;
  constructor() {
    super();
    this.state = {
      alertClass: 'show'
    }
  }

	componentDidMount = () => {
	  this.isMounted = true;
	  setTimeout(() => {
	    // slide out / hide
	    if (this.isMounted) {
	      this.setState({
	        alertClass: ''
	      });
	    }
	    // remove data
	    setTimeout(() => {
	      showAlertBox(null);
	    }, 200);
	  }, 5000);
	};

  componentWillUnmount = () => {
    this.isMounted = false;
  }
	render = ({ success, message, noTopBar }) => {
	  if (!message) {
	    return null;
	  }
    
	  return (
	    <div className={`${style.alertBox} ${style[this.state.alertClass]} ${noTopBar ? style.noUser : ''}`}>
	      <span className={`${style.alertIcon} ${(success ? style.success : style.error)}`}>
	        <ImageLoader
	          src={`assets/images/${success ? 'success' : 'error' }.png`}
	          style={{ container: style.ico }}
	        />
	      </span>
	      <span className={style.alertText}>{getTranslation(message)}</span>
	    </div>
	  );
	};
}
