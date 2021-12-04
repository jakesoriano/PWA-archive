import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import {
  messageModal,
  promptModal,
  componentModal,
  livechatEnabled,
  livechatClick,
  displayPageLoader
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ModalButtons extends Component {
	render = ({ page, liveChatLink }) => {
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
	      {/* Component */}
	      <button
	        onClick={() => {
	          route(`/${page}/language`, true);
	        }}
	        type="button"
	      >
					Show Language Popup Page
	      </button>
	      {/* LiveChat */}
	      <button
	        onClick={() => {
	          if (livechatEnabled(liveChatLink)) {
	            livechatClick(liveChatLink);
	          } else {
	            window.location = liveChatLink.replace(
	              /{page_referrer}/gim,
	              window.encodeURIComponent(window.location.href)
	            );
	          }
	        }}
	        type="button"
	      >
					Live Chat Link
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
