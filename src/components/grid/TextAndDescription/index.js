import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import style from './style';

class TextAndDescription extends Component {
	render = ({ title, description }) => {
	  return (
	    <div className={style.hfWrap}>
	      {title && <span className={style.title}>{getTranslation(title)}</span>}
	      <span className={style.description}>{getTranslation(description)}</span>
	    </div>
	  );
	};
}
export default connect([])(TextAndDescription);
