import { h } from 'preact';
import { componentModal } from '_helpers';
import Modal from '../Modal';
import ImageLoader from '../ImageLoader';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, content }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <Modal
    fullscreen={false}
    title={title}
    hideHeader={true}
    cbClose={() => {
      componentModal(null);
    }}
  >
    <div className={style.componentModal}>
      <a className={`${style.pClose}`} onClick={() => {
      componentModal(null);
      }}>
        <ImageLoader
          src="assets/images/closebutton.png"
          style={{container: style.closeBtn}}
        />
      </a>
      {content}
    </div>
  </Modal>
);
