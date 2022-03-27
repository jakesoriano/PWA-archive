import { Component } from 'preact';
import { dateNewsFormat, getTranslation } from '_helpers';
import style from './style';
class DismissableText extends Component {
  constructor(props) {
    super(props);
  }
	onClickDismiss = () => {
	  this.props.onClickDismissCb();
	};
	render = ({ date, text }, {}) => (
	  <div className={`dismissable-text ${style.dtWrap}`}>
	    <div className={style.head}>
	      {date && <p className={style.date}>{dateNewsFormat(date)}</p>}
	      <span className={style.dismiss} onClick={this.onClickDismiss}>
	        {getTranslation('DISMISS')}
	      </span>
	    </div>
	    <div className={style.body}>
	      {text && <p className={`bold ${style.text}`}>{text}</p>}
	    </div>
	  </div>
	);
}
export default DismissableText;
