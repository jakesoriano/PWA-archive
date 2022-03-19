import { Component } from 'preact';
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
	      {text}
	    </p>
	  );
}
export default Text;
