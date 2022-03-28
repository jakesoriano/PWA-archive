import { Component } from 'preact';
import { route, Link } from 'preact-router';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
import style from './style';

class TextAndDescription extends Component {
	render = ({ title, description }) => {
	  return (
	    <div className={style.hfWrap}>
	      {title && <span className={style.title}>{title}</span>}
	      <span className={style.description}>{description}</span>
	    </div>
	  );
	};
}
export default connect([])(TextAndDescription);
