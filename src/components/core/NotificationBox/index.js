import { Component, createRef } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default class NotificationBox extends Component {
	ref = createRef();

	componentDidMount = () => {
	  if (this.ref.current) {
      this.ref.current && this.ref.current.classList.add(style.show);
	  }
    setTimeout(() => {
      this.ref.current && this.ref.current.classList.remove(style.show);
    }, 5000)
	};

	render = ({ success, content }) => (
    <div ref={this.ref} className={style.notificationBox}>
      <span className={`${style.notificationIcon} ${(success ? style.success : style.error)}`}>{success ? '✓' : '✖'}</span>
      <span className={style.notificationText}>{content}</span>
    </div>
	);
}
