import { Component } from 'preact';
import { getTranslation } from '_helpers';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ButtonDescription extends Component {
	render = ({ onClickCallback, text, bottomDescription, isDisabled, buttonStyle, bottomDescStyle }) => {
	  return (
	    <div className={style.buttonDescWrapper}>
	      <button
	        type="button"
	        className={`bold ${style.button} ${buttonStyle}`}
	        disabled={isDisabled}
	        onClick={(e) => onClickCallback(e)}
	      >
	        {getTranslation(text)}
	      </button>
	      {bottomDescription && <p className={`${style.small} ${bottomDescStyle}`}>{getTranslation(bottomDescription)}</p>}
	    </div>
	  );
	};
}
export default ButtonDescription;
