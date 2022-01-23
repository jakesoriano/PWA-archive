import { h } from 'preact';
import { messageModal } from '_helpers';
import Modal from '../Modal';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, message, btnText, cbOk, disableClose }) => (
  <Modal
    title={title}
    disableClose={disableClose}
    cbClose={() => {
      messageModal(null);
    }}
  >
    <div className={style.messageModal}>
      <p>{message}</p>

      {/* buttons */}
      <div className={style.footer}>
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
      </div>

    </div>

  </Modal>
);
