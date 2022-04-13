import { Component } from 'preact';
import { getTranslation } from '_helpers';
import style from './style';
class Text extends Component {
	render = ({ text, id, additionalClass, isTitle }) =>
	  text && (
	    <p
	      id={id}
	      className={`${additionalClass} ${style.text} ${
					isTitle ? style.title : ''
				}`}
	    >
	      {getTranslation(text)}
	    </p>
	  );
}
export default Text;
