import { h } from 'preact';
import { componentModal } from '_helpers';
import Modal from '../Modal';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, content }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <Modal
    fullscreen
    title={title}
    cbClose={() => {
      componentModal(null);
    }}
  >
    <div className={style.componentModal}>{content}</div>
  </Modal>
);
