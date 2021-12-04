import { Component } from 'preact';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ButtonDescription extends Component {
	render = ({ onClickCallback, text, bottomDescription, isDisabled }) => {
	  return (
	    <div className={style.buttonDescWrapper}>
	      <button
	        type="button"
	        className={style.button}
	        disabled={isDisabled}
	        onClick={(e) => onClickCallback(e)}
	      >
	        {text}
	      </button>
	      <small>{bottomDescription}</small>
	    </div>
	  );
	};
}
export default ButtonDescription;
