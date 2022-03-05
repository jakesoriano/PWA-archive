import { h, Component } from 'preact';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { sendContactUs } from '_mutations';
import {
  LoaderRing,
  FormGroup,
  FormInput,
  FormDropdown,
  ImageLoader,
  ButtonDescription,
} from '_components/core';
import {
  getTranslation,
  getCategories,
  circleModal,
  uploadFile,
  displayPageLoader,
  showAlertBox,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      categoryOptions: getCategories(),
      category: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      subject: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      message: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      attachment: {
        file: null,
        error: '',
        message: '',
        hasError: false,
      },
    };
    this.state = this.initialState;
  }

	onAttachmentChange = (file) => {
	  this.setState({
	    attachment: {
	      ...this.state.attachment,
	      file: file,
	      // hasError: !Boolean(file),
	      // error: !Boolean(file) ? 'REQUIRED' : ''
	    },
	  });
	};

	onMessageChange = (value) => {
	  this.setState({
	    message: {
	      ...this.state.message,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onSubjectChange = (value) => {
	  this.setState({
	    subject: {
	      ...this.state.subject,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onCategoryChange = (value) => {
	  this.setState({
	    category: {
	      ...this.state.category,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	submitData = (image) => {
	  sendContactUs({
	    category: this.state.category.value,
	    subject: this.state.subject.value,
	    message: this.state.message.value,
	    attachment: image,
	  }).then((res) => {
	    displayPageLoader(false);
	    if (res && res.success) {
	      this.setState({
	        ...this.initialState,
	      });
	      const { authUser } = this.props;
	      circleModal({
	        title: getTranslation('MESSAGE_SENT_TITLE'),
	        content: getTranslation('MESSAGE_SENT_MSG'),
	        code: `${getTranslation('CODE_REF')} ${res.refcode || ''}`,
	      });
	    } else {
	      showAlertBox({
	        message: res.errMessage || 'OOPS_SOMETHING_WRONG',
	      });
	    }
	  });
	};

	handleContinue = () => {
	  if (
	    !this.state.category.value ||
			!this.state.subject.value ||
			!this.state.message.value
	  ) {
	    this.onCategoryChange(this.state.category.value);
	    this.onSubjectChange(this.state.subject.value);
	    this.onMessageChange(this.state.message.value);
	  } else {
	    displayPageLoader(true);
	    if (!this.state.attachment.file) {
	      this.submitData();
	    } else {
	      uploadFile({
	        file: this.state.attachment.file,
	      }).then((res) => {
	        if (res.success && res.data) {
	          this.submitData(res.data.image);
	        } else {
	          displayPageLoader(false);
	          showAlertBox({
	            message: res.errMessage || 'OOPS_SOMETHING_WRONG',
	          });
	        }
	      });
	    }
	  }
	};

	render = (
	  { authUser },
	  { category, subject, message, attachment, categoryOptions }
	) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.contactUs}>
	      <div className={style.infoWrap}>
	        <FormGroup
	          label={getTranslation('CATEGORY')}
	          hasError={category.hasError}
	          className={style.formGroup}
	        >
	          <FormDropdown
	            label=""
	            className={style.category}
	            value={category.value}
	            options={categoryOptions}
	            getValue={(option) => option.value}
	            getText={(option) => option.text}
	            onBlur={(e) => {
	              this.onCategoryChange(e.target.value);
	            }}
	            onChange={(e) => {
	              this.onCategoryChange(e.target.value);
	            }}
	            hasError={category.hasError}
	            error={category.error}
	            message={category.message}
	          />
	        </FormGroup>
	        <FormGroup
	          label={getTranslation('SUBJECT')}
	          className={style.formGroup}
	        >
	          <FormInput
	            className={style.subject}
	            style={{ error: style.subject }}
	            value={subject.value}
	            type="text"
	            onBlur={(e) => {
	              this.onSubjectChange(e.target.value);
	            }}
	            onInput={(e) => {
	              this.onSubjectChange(e.target.value);
	            }}
	            hasError={subject.hasError}
	            error={subject.error}
	            message={subject.message}
	          />
	        </FormGroup>
	        <FormGroup
	          label={getTranslation('NARRATE_CONCERN')}
	          className={style.formGroup}
	        >
	          <FormInput
	            className={style.message}
	            style={{ error: style.message }}
	            value={message.value}
	            type="textarea"
	            rows="4"
	            onBlur={(e) => {
	              this.onMessageChange(e.target.value);
	            }}
	            onInput={(e) => {
	              this.onMessageChange(e.target.value);
	            }}
	            hasError={message.hasError}
	            error={message.error}
	            message={message.message}
	          />
	        </FormGroup>

	        <FormGroup className={style.formGroup}>
	          <div className={style.attachmentWrap}>
	            <div className={style.attachmentInputWrap}>
	              {!attachment.file && (
	                <span className={style.attLabel}>
	                  {getTranslation('ATTACHMENT')}
	                  <ImageLoader
	                    src="assets/images/icon_attachment_blue.png"
	                    style={{ container: style.attIcon }}
	                  />
	                </span>
	              )}
	              <FormInput
	                id="inputAttachment"
	                className={style.attachment}
	                style={{
	                  error: style.attachment,
	                  dummy: attachment.file ? style.dummyInput : style.hidden,
	                }}
	                value={attachment.file}
	                type="file"
	                onBlur={(e) => {
	                  this.onAttachmentChange(e.target.files[0]);
	                }}
	                onInput={(e) => {
	                  this.onAttachmentChange(e.target.files[0]);
	                }}
	                hasError={attachment.hasError}
	                error={attachment.error}
	                message={attachment.message}
	              />
	            </div>
	            <div>
	              <a
	                className={style.pShare}
	                onClick={() => {
	                  document.getElementById('inputAttachment').click();
	                }}
	              >
	                <span>{getTranslation('ADD_FILE')}</span>
	              </a>
	            </div>
	          </div>
	        </FormGroup>
	      </div>

	      <div className={style.buttonContainer}>
	        <ButtonDescription
	          onClickCallback={() => {
	            this.handleContinue();
	          }}
	          text={getTranslation('CONTINUE')}
	        />
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(ContactUs);
