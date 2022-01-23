import { h } from 'preact';
import { promptModal } from '_helpers';
import Modal from '../Modal';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, message, textNo, textYes, cbOk }) => (
  <Modal
    title={title}
    cbClose={() => {
      promptModal(null);
    }}
  >
    <div className={style.promptModal}>
      {/* Message */}
      <p>{message}</p>

      {/* buttons */}
      <div className={style.footer}>
        {/* No button */}
        <button
          onClick={() => {
            promptModal(null);
          }}
          type="button"
          aria-label="No"
        >
          {textNo || 'No'}
        </button>

        {/* Yes Button */}
        <button
          onClick={() => {
            cbOk();
          }}
          type="button"
          aria-label="Yes"
        >
          {textYes || 'Yes'}
        </button>
      </div>
    </div>
  </Modal>
);
