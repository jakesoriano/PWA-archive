import { h } from 'preact';
import { messageModal } from '_helpers';
import Modal from '../Modal';

export default ({ title, message, btnText, cbOk, disableClose }) => (
  <Modal
    title={title}
    disableClose={disableClose}
    cbClose={() => {
      messageModal(null);
    }}
  >
    <p>{message}</p>

    {/* Yes Button */}
    <button
      onClick={() => {
        cbOk();
      }}
      type="button"
      aria-label="Ok"
    >
      {btnText || 'Ok'}
    </button>

  </Modal>
);
