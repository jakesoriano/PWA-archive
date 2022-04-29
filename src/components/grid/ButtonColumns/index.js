import { Component } from 'preact';
import { route } from 'preact-router';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import { logOut } from '_mutations';
import style from './style';
class ButtonColumns extends Component {
	onClick = (url) => {
	  if (url && url.substr(0, 4) == 'http') {
	    window.open(url);
	  } else if (url) {
	    route(url);
	  }
	};

	render = ({ data, page, isLogout }, {}) => (
	  <div className={style.buttonsWrap}>
	    {data.map((item, index) => {
	      return (
	        <button
	          id={item.id || `${page}-${index}`}
	          className={style.item}
	          onClick={() => {
	            if (isLogout) {
	              logOut();
	            } else {
	              this.onClick(item.url);
	            }
	          }}
	        >
	          {/* Icon */}
	          {item.icon && (
	            <div className={style.iconCont}>
	              <ImageLoader
	                style={{ container: style.icon }}
	                src={item.icon}
	                lazy={false}
	              />
	            </div>
	          )}
	          {/* Text */}
	          {item.text && (
	            <span className={`bold ${style.text}`}>
	              {getTranslation(item.text)}
	            </span>
	          )}
	          {/* Tag */}
	          {item.tag && (
	            <span className={style.tag}>{getTranslation(item.tag)}</span>
	          )}
	        </button>
	      );
	    })}
	  </div>
	);
}
export default ButtonColumns;
