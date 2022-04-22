import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, showTourGuide } from '_helpers';
import style from './style';
class House2HouseBanner extends Component {
	render = ({ id, image, url, pinkfinder }, {}) => (
	  <div id={id} className={style.banner}>
	    <a href={url} target="_blank" rel="noopener noreferrer">
	      <ImageLoader
	        style={{
	          container: pinkfinder ? style.finderContainer : style.imgContainer,
	        }}
	        src={image}
	        lazy
	      />
	    </a>
	  </div>
	);
}
export default House2HouseBanner;
