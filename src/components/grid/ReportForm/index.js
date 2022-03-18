import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
// import { sendIncidentReport } from '_mutations';
import { sendReport } from '_mutations';
import {
  LoaderRing,
  FormGroup,
  FormInput,
  FormDropdown,
  ImageLoader,
  ButtonDescription,
  SubHeader,
} from '_components/core';
import {
  getTranslation,
  getIncidentCategories,
  successMessage,
  uploadFile,
  displayPageLoader,
  showAlertBox,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      categoryOptions: getIncidentCategories(),
      email: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      category: {
        value: props.category,
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
      shareLocation: {
        checked: false,
        required: false,
      },
      shareContact: {
        checked: false,
        required: false,
      },
      agreeToTerms: {
        checked: false,
        required: false,
      },
    };
    this.state = this.initialState;
  }

	onEmailChange = (value) => {
	  const validEmail = value.match(
	    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
	  this.setState({
	    email: {
	      ...this.state.email,
	      value: value,
	      hasError: !Boolean(validEmail),
	      error: !Boolean(validEmail) ? 'Invalid Email' : '',
	    },
	  });
	};

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

	onCheckShareLoc = () => {
	  this.setState({
	    shareLocation: {
	      ...this.state.shareLocation,
	      required: true,
	    },
	  });
	};

	onCheckShareContact = () => {
	  this.setState({
	    shareContact: {
	      ...this.state.shareContact,
	      required: true,
	    },
	  });
	};

	onCheckTerms = () => {
	  this.setState({
	    agreeToTerms: {
	      ...this.state.agreeToTerms,
	      required: true,
	    },
	  });
	};

	submitData = (image) => {
	  sendReport({
	    email: this.state.email.value,
	    category: this.state.category.value,
	    subject: this.state.subject.value,
	    content: this.state.message.value,
	    // shareLocation: this.state.shareLocation.checked,
	    // shareContactDetails: this.state.shareContact.checked,
	    // agreeToTermsAndConditions: this.state.agreeToTerms.checked,
	    filename: image,
	  }).then((res) => {
	    displayPageLoader(false);
	    if (res && res.success) {
	      this.setState({
	        ...this.initialState,
	      });
	      successMessage({
	        pageTitle: getTranslation('KNOW_YOUR_RIGHTS'),
	        title: getTranslation('SUBMIT_SUCCESS'),
	        message: getTranslation('SUBMIT_REPORT_SUCCESS'),
	      });
	    } else {
	      showAlertBox({
	        message: res?.error?.message || 'OOPS_SOMETHING_WRONG',
	      });
	    }
	  });
	};

	handleContinue = () => {
	  if (
	    this.state.email.hasError ||
			!this.state.email.value ||
			!this.state.category.value ||
			!this.state.subject.value ||
			!this.state.message.value ||
			!this.state.agreeToTerms.checked ||
			!this.state.shareLocation.checked ||
			!this.state.shareContact.checked
	  ) {
	    this.onEmailChange(this.state.email.value);
	    this.onCategoryChange(this.state.category.value);
	    this.onSubjectChange(this.state.subject.value);
	    this.onMessageChange(this.state.message.value);
	    this.onCheckTerms();
	    this.onCheckShareLoc();
	    this.onCheckShareContact();
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
	  {
	    category,
	    subject,
	    message,
	    attachment,
	    categoryOptions,
	    shareLocation,
	    shareContact,
	    agreeToTerms,
	    email,
	  }
	) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.formWrap}>
	      <SubHeader title={`${this.state.category.value} Report`} />
	      <div className={style.contactUs}>
	        <div className={style.infoWrap}>
	          <FormGroup
	            label={getTranslation('EMAIL')}
	            className={style.formGroup}
	          >
	            <FormInput
	              className={style.email}
	              style={{ error: style.email }}
	              value={email.value}
	              type="text"
	              onBlur={(e) => {
	                this.onEmailChange(e.target.value);
	              }}
	              onInput={(e) => {
	                this.onEmailChange(e.target.value);
	              }}
	              hasError={email.hasError}
	              error={email.error}
	              message={email.message}
	            />
	          </FormGroup>
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
	                  <span className={`bold`}>{getTranslation('ADD_FILE')}</span>
	                </a>
	              </div>
	            </div>
	          </FormGroup>
	          <FormGroup className={style.checkBoxGroup}>
	            <FormInput
	              type={'checkbox'}
	              label={getTranslation('SHARE_LOCATION')}
	              onClick={() => {
	                this.setState({
	                  shareLocation: {
	                    ...shareLocation,
	                    checked: !shareLocation.checked,
	                  },
	                });
	              }}
	              checked={shareLocation.checked}
	              name="shareLoc"
	              className={style.checkBox}
	              style={{
	                container:
										shareLocation.required && !shareLocation.checked
										  ? style.checkWrap
										  : '',
	              }}
	            />
	            <FormInput
	              type={'checkbox'}
	              label={getTranslation('SHARE_CONTACT_DETAILS')}
	              onClick={() => {
	                this.setState({
	                  shareContact: {
	                    ...shareContact,
	                    checked: !shareContact.checked,
	                  },
	                });
	              }}
	              checked={shareContact.checked}
	              name="shareContact"
	              className={style.checkBox}
	              style={{
	                container:
										shareContact.required && !shareContact.checked
										  ? style.checkWrap
										  : '',
	              }}
	            />

	            <FormInput
	              type="checkbox"
	              label={getTranslation('AGREE_TERMS')}
	              onClick={() => {
	                this.setState({
	                  agreeToTerms: {
	                    ...agreeToTerms,
	                    checked: !agreeToTerms.checked,
	                  },
	                });
	              }}
	              checked={agreeToTerms.checked}
	              name="agreeToTerms"
	              className={style.checkBox}
	              style={{
	                container:
										agreeToTerms.required && !agreeToTerms.checked
										  ? style.checkWrap
										  : '',
	              }}
	            />
	          </FormGroup>
	        </div>
	        <div className={style.buttonContainer}>
	          <ButtonDescription
	            onClickCallback={() => {
	              this.handleContinue();
	            }}
	            text={getTranslation('SUBMIT_REPORT')}
	            buttonStyle={`${style.buttonStyle}`}
	          />
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(ReportForm);
