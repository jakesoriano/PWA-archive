import { h, Component } from 'preact';
import { ImageLoader } from '_components/core';
import { getTranslation } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';
// eslint-disable-next-line react/prefer-stateless-function
class SubHeader extends Component {
	render = ({ image, title }) => {
	  return (
	    <div className={style.subHeader}>
	      <ImageLoader
	        src={image}
	        style={{ container: style.imgWrap, image: style.img }}
	        lazy
	      />
	      <p className={`bold ${style.title}`}>{getTranslation(title)}</p>
	    </div>
	  );
	};
}
export default SubHeader;
