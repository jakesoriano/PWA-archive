import { Component } from 'preact';
import { ImageLoader } from '_components/core';
import { componentModal, getTranslation } from '_helpers';
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
	    {item.file.indexOf('.pdf') <= -1 ? (
	      <ImageLoader
	        src={item.file}
	        style={{ container: style.modalImage }}
	        lazy
	      />
	    ) : null}
	    <p className={style.title}>{item.title}</p>
	    <a
	      className={style.button}
	      href={item.file}
	      download
	      target="_blank"
	      rel="noreferrer"
	    >
	      {getTranslation('DOWNLOAD_FILE')}
	    </a>
	  </div>
	);
	render = ({ heading, data, id }) => (
	  <div id={id} className={style.hilWrap}>
	    {heading && <p className={`bold ${style.heading}`}>{heading}</p>}
	    <div className={style.itemsWrap}>
	      {data &&
					data.length &&
					data.map((item) => {
					  return (
					    <a
					      id={item.id}
					      className={style.item}
					      onClick={() => {
					        this.onClick(item);
					      }}
					    >
					      {item.thumbnail && (
					        <ImageLoader
					          src={item.thumbnail}
					          style={{ container: style.thumbnail }}
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
}
export default HorizontalImageList;
