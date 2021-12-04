import { h } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, cbClose, children }) => (
  <div id="modal" className={style.modal}>
    <div className={style.modalContentWrap}>
      <div id="modal_content" className={style.modalContent}>
        {/* header */}
        <div id="modal_header" className={style.modalHeader}>
          {/* text */}
          <h3>{title}</h3>
          {/* x button */}
          <button className="cancel" onClick={cbClose} type="button" aria-label="Cancel">
						x
          </button>
        </div>

        {/* Body */}
        <div id="modal_body" className={style.modalBody}>
          {children}
        </div>
      </div>
    </div>
  </div>
);
