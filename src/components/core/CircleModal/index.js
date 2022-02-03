import { h } from 'preact';
import { circleModal } from '_helpers';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ headerIcon, title, content, code, callback }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <div id="modal" className={style.circleModal}>
    <div className={style.modalContentWrap}>
      <div id="modal_content" className={style.modalContent}>
        {/* Icon */}
        {headerIcon && (
          <div className={style.modalIcon}>
            <ImageLoader src={headerIcon} lazy style={{container: style.imgCont}}/>
          </div>
        )}
        {/* header */}
        <div id="modal_header" className={style.modalHeader}>
          {/* text */}
          <h3 className="bold">{title}</h3>
          {/* x button */}
          <button className="cancel" onClick={() => {
            circleModal(null);
            if (callback) {
              callback();
            }
          }}
          type="button" aria-label="Cancel">
						x
          </button>
        </div>
        {/* Body */}
        <div id="modal_body" className={style.modalBody}>
          <div className={style.descWrap}>
            <div className={style.desc}>{content}</div>
          </div>
          {code && <span className={`extraBold ${style.code}`}>{code}</span>}
        </div>
      </div>
    </div>
  </div>
);
