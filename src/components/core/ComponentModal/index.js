import { h } from 'preact';
import { componentModal } from '_helpers';
import Modal from '../Modal';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, content, fullscreen }) => (
  // eslint-disable-next-line react/jsx-no-bind
  <Modal
    fullscreen={fullscreen || false}
    title={title}
    cbClose={() => {
      componentModal(null);
    }}
  >
    <div className={style.componentModal}>{content}</div>
  </Modal>
);
