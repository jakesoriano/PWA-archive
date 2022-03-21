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

	render = ({ id, image, url }, {}) => (
	  <button
	    id={id}
	    className={style.banner}
	    onClick={() => {
	      this.onClick(url);
	    }}
	  >
	    <ImageLoader style={{ container: style.imgContainer }} src={image} lazy />
	  </button>
	);
}
export default Buttons;
