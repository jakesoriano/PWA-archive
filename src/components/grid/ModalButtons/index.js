import { Component } from 'preact';
import { connect } from 'unistore/preact';
import {
  messageModal,
  promptModal,
  componentModal,
  displayPageLoader
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ModalButtons extends Component {
	render = () => {
	  return (
	    <div className={`${style.modalButtons}`}>
	      {/* Message */}
	      <button
	        onClick={() => {
	          messageModal({
	            title: 'Message Modal',
	            message: 'This is a sample message.'
	          });
	        }}
	        type="button"
	      >
					Show Message Modal
	      </button>
	      {/* Prompt */}
	      <button
	        onClick={() => {
	          promptModal({
	            title: 'Confirmation Modal',
	            message: 'Are you sure you want to do the action?',
	            textNo: 'NO',
	            textYes: 'YES',
	            cbOk: () => {
	              // no action here
	              promptModal(null);
	            }
	          });
	        }}
	        type="button"
	      >
					Show Prompt Modal
	      </button>
	      {/* Component */}
	      <button
	        onClick={() => {
	          componentModal({
	            title: 'Component Modal',
	            content: <ModalButtons />
	          });
	        }}
	        type="button"
	      >
					Show Component Modal
	      </button>
	      {/* Page Loader */}
	      <button
	        onClick={() => {
	          displayPageLoader(true);
	          setTimeout(() => {
	            displayPageLoader(false);
	          }, 1000);
	        }}
	        type="button"
	      >
					Page Loader in 1 second
	      </button>
	    </div>
	  );
	};
}
export default connect(['liveChatLink'])(ModalButtons);
