import { h } from 'preact';
import { messageModal } from '_helpers';
import Modal from '../Modal';

export default ({ title, message }) => (
  <Modal
    title={title}
    cbClose={() => {
      messageModal(null);
    }}
  >
    <p>{message}</p>
  </Modal>
);
