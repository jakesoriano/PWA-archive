import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import {
  FormGroup,
  FormDropdown,
  FormInput,
  ImageLoader,
  ButtonDescription,
} from '_components/core';
import { PinkPatrol } from '_components/grid';
import { getTranslation, promptModal, componentModal } from '_helpers';
import { updateStore } from '_unistore';
import style from './style';

class PinkPatrolDraft extends Component {
	useDraft = (i) => {
	  componentModal({
	    content: this.renderDraftModal(i),
	    transparentBG: true,
	  });
	};

	renderDraftModal = (i) => {
	  return (
	    <div className={style.draftWrap}>
	      <p className={`bold ${style.modalTitle}`}>
	        {`${getTranslation('DRAFT')}: ${
						this.props.pinkPatrol.data[i].data.reportType
					} | ${this.props.pinkPatrol.data[i].data.time}`}
	      </p>
	      <div className={style.draftItem}>
	        <PinkPatrol draftIndex={i} />
	      </div>
	    </div>
	  );
	};

	onDeleteDraft = (i) => {
	  let newData = this.props.pinkPatrol.data;
	  newData.splice(i, 1);
	  updateStore({
	    pinkPatrol: {
	      ...this.props.pinkPatrol,
	      data: newData,
	    },
	  });
	};

	showDeleteConfirmation = (i) => {
	  const draftItem = this.props.pinkPatrol.data[i];
	  promptModal({
	    title: getTranslation('DELETE_DRAFT'),
	    message: `${getTranslation('DELETE_DRAFT')}: ${
				draftItem.data.reportType
			} | ${draftItem.data.time} ?`,
	    cbOk: () => {
	      this.onDeleteDraft(i);
	      promptModal(null);
	    },
	  });
	};

	render = ({ pinkPatrol }, {}) => (
	  <div className={style.draftList}>
	    {pinkPatrol.data.map((i, index) => (
	      <div className={style.buttonDraft}>
	        <div
	          className={style.draftInfo}
	          onClick={(e) => this.useDraft(index)}
	        >
	          <ImageLoader
	            src="assets/images/punctuation.png"
	            style={{ container: style.iconStyle }}
	            lazy
	          />
	          <p className={'bold'}>
	            {`Draft: ${i.data.reportType} | ${i.data.time}`}
	          </p>
	        </div>
	        <div
	          className={style.deleteContainer}
	          onClick={(e) => this.showDeleteConfirmation(index)}
	        >
	          <ImageLoader
	            src="assets/images/icon_delete_white.png"
	            style={{ container: style.iconDelete }}
	            lazy
	          />
	        </div>
	      </div>
	    ))}
	  </div>
	);
}
export default connect(['authUser', 'pinkPatrol'])(PinkPatrolDraft);
