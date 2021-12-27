import { h } from 'preact';
import { circleModal } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, content, code, callback }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <div id="modal" className={style.circleModal}>
    <div className={style.modalContentWrap}>
      <div id="modal_content" className={style.modalContent}>
        {/* header */}
        <div id="modal_header" className={style.modalHeader}>
          {/* text */}
          <h3>{title}</h3>
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
