import { h } from 'preact';
import { promptModal } from '_helpers';
import Modal from '../Modal';
// eslint-disable-next-line import/extensions
import style from './style';

export default ({ title, textYes, cbOk }) => (
  <Modal
    title={title}
    disableClose={true}
    cbClose={() => {
      promptModal(null);
    }}
  >
    <div className={style.promptModal}>
      <div className={style.footer}>
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
