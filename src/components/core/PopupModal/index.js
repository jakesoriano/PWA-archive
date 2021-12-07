// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, message, bottomText, onClose }) => (
  <div className={style.popupModal}>
    <div className={style.popupModalContentWrapper}>
      <div className={style.popupModalContent}>
        {title && <p className={`${style.title} extraBold`}>{title}</p>}
        {message && <p className={style.message}>{message}</p>}
        {bottomText && <p className={`${style.bottomText} extraBold`}>{bottomText}</p>}
        <span onClick={onClose} className={style.close}>✖</span>
      </div>
    </div>
  </div>
);
