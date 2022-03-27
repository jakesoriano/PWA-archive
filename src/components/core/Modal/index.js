import { h } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({
  title,
  cbClose,
  children,
  fullscreen,
  disableClose,
  styles,
  hideHeader,
  id,
}) => (
  <div
    id={id || 'modal'}
    className={`${style.modal} ${fullscreen ? style.fullscreen : ''} ${
			styles.modal || ''
		}`}
  >
    <div className={`${style.modalContentWrap} ${styles.contentWrap || ''}`}>
      <div
        id="modal_content"
        className={`${style.modalContent}  ${styles.content || ''}`}
      >
        {/* header */}
        {!hideHeader && (
          <div id="modal_header" className={style.modalHeader}>
            {/* back for fullscreen */}
            {fullscreen && (
              <button className="icon-back clickable" onClick={cbClose}>
								❮
              </button>
            )}
            {/* text */}
            <h3 className={`${disableClose ? 'light' : ''}`}>{title}</h3>
            {/* x button */}
            {!fullscreen && !disableClose && (
              <button
                className="cancel"
                onClick={cbClose}
                type="button"
                aria-label="Cancel"
              >
								x
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div id="modal_body" className={style.modalBody}>
          {children}
        </div>
      </div>
    </div>
  </div>
);
