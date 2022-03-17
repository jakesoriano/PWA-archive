import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, showTourGuide } from '_helpers';
import style from './style';
class Buttons extends Component {
	onClick = (url) => {
	  if (url) {
	    route(url);
	  }
	};

	render = ({ data }, {}) => (
	  <div className={style.buttonsWrap}>
	    {data.map((item, index) => {
	      return (
	        <button
	          id={item.id || `home-${index}`}
	          className={style.item}
	          onClick={() => {
	            this.onClick(item.url);
	          }}
	        >
	          {/* Icon */}
	          {item.icon && (
	            <ImageLoader
	              style={{ container: style.icon }}
	              src={item.icon}
	              lazy={false}
	            />
	          )}
	          {/* Text */}
	          {item.text && (
	            <span className={style.text}>{getTranslation(item.text)}</span>
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
export default Buttons;
