import { Component } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default class AlertBox extends Component {
  constructor() {
    super();
    this.state = {
      alertClass: 'show'
    }
  }

	componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        alertClass: ''
      })
    }, 5000)
	};

	render = ({ success, content }) => (
    <div className={`${style.alertBox} ${style[this.state.alertClass]}`}>
      <span className={`${style.alertIcon} ${(success ? style.success : style.error)}`}>{success ? '✓' : '✖'}</span>
      <span className={style.alertText}>{content}</span>
    </div>
	);
}
