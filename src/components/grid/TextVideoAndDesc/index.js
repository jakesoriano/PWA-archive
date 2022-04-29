import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { getTranslation } from '_helpers';
import style from './style';

class TextVideoAndDesc extends Component {
	render = ({ title, video, description }) => {
	  return (
	    <div className={style.hfWrap}>
	      {title && (
	        <span className={`bold ${style.title}`}>{getTranslation(title)}</span>
	      )}
	      {video && (
	        <iframe
	          className={style.video}
	          width="100%"
	          height="300"
	          frameBorder="0"
	          src={video}
	        ></iframe>
	      )}
	      <span className={style.description}>{getTranslation(description)}</span>
	    </div>
	  );
	};
}
export default connect([])(TextVideoAndDesc);
