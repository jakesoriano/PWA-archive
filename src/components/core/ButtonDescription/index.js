import { Component } from 'preact';
import { getTranslation } from '_helpers';
import { ImageLoader } from '_components/core';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ButtonDescription extends Component {
	render = ({ onClickCallback, text, bottomDescription, topDescription, isDisabled, buttonStyle, bottomDescStyle, topDescStyle, active, id, icon, iconStyle, iconImgStyle }) => {
	  return (
	    <div className={style.buttonDescWrapper}>
	      {topDescription && <p className={`${topDescStyle}`}>{getTranslation(topDescription)}</p>}
	      <button
	        id={id || ''}
	        type="button"
	        className={`bold ${style.button} ${buttonStyle} ${active ? style.active : ''}`}
	        disabled={isDisabled}
	        onClick={(e) => onClickCallback(e)}
	      >
	        {icon && (
	          <ImageLoader
	            src={icon}
	            style={{ container: iconStyle, image: iconImgStyle }}
	            lazy
	          />
	        )}
	        {getTranslation(text)}
	      </button>
	      {bottomDescription && <p className={`${style.small} ${bottomDescStyle}`}>{getTranslation(bottomDescription)}</p>}
	    </div>
	  );
	};
}
export default ButtonDescription;
