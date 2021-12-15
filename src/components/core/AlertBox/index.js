import { Component } from 'preact';
import { updateStore } from '_unistore';
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
        updateStore({
          alertShow: null
        });
      }, 200);
    }, 5000);
	};

  componentWillUnmount = () => {
    this.isMounted = false;
  }
	render = ({ success, content, noTopBar }) => {
    if (!content) {
      return null;
    }
    
    return (
      <div className={`${style.alertBox} ${style[this.state.alertClass]} ${noTopBar ? style.noUser : ''}`}>
        <span className={`${style.alertIcon} ${(success ? style.success : style.error)}`}>{success ? '✓' : '✖'}</span>
        <span className={style.alertText}>{content}</span>
      </div>
    );
  };
}