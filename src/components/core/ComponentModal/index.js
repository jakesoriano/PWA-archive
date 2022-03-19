import { h } from 'preact';
import { componentModal } from '_helpers';
import Modal from '../Modal';
import ImageLoader from '../ImageLoader';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, content, modalId, transparentBG }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <Modal
    styles={{
      modal: style.modal,
      contentWrap: style.contentWrap,
      content: `${style.content} ${transparentBG ? style.transparentBG : ''}`,
    }}
    id={modalId}
    hideHeader
    cbClose={() => {
      componentModal(null);
    }}
  >
    <>
      <a
        className={`${style.closeBtn}`}
        onClick={() => {
          componentModal(null);
        }}
      >
        <ImageLoader
          src="assets/images/icon_close_white.png"
          style={{ container: style.imgWrap }}
        />
      </a>
      <div className={style.componentModal}>{content}</div>
    </>
  </Modal>
);
