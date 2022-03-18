import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import {
  componentModal,
  getTranslation,
  getConfigByKey,
  replaceUrlPlaceholders,
} from '_helpers';
import style from './style';
class HorizontalImageList extends Component {
	onClick = (item) => {
	  if (item) {
	    componentModal({
	      content: this.renderModalContent(item),
	      modalId: 'tarp_modal',
	    });
	  }
	};
	renderModalContent = (item) => (
	  <div className={style.modalWrap}>
	    <ImageLoader
	      src={item.preview}
	      style={{ container: style.modalImage }}
	      lazy
	    />
	    <p className={style.title}>{item.title}</p>
	    <a
	      className={style.button}
	      href={replaceUrlPlaceholders(item.file)}
	      download
	      target="_blank"
	      rel="noreferrer"
	    >
	      {getTranslation('DOWNLOAD_FILE')}
	    </a>
	  </div>
	);
	render = ({ heading, data, id, dataKey }) => {
	  const items = dataKey ? getConfigByKey(dataKey) : data;

	  if (!(items && items.length)) {
	    return null;
	  }

	  return (
	    <div id={id} className={style.hilWrap}>
	      {heading && <p className={`bold ${style.heading}`}>{heading}</p>}
	      <div className={style.itemsWrap}>
	        {items.map((item) => {
	          return (
	            <a
	              id={item.id}
	              className={style.item}
	              onClick={() => {
	                this.onClick(item);
	              }}
	            >
	              {item.thumb && (
	                <ImageLoader
	                  src={item.thumb}
	                  style={{ container: style.thumb }}
	                  lazy
	                />
	              )}
	              {item.title && <p className={style.title}>{item.title}</p>}
	            </a>
	          );
	        })}
	      </div>
	    </div>
	  );
	};
}
export default HorizontalImageList;
