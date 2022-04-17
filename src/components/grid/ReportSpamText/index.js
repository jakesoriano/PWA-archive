import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { reportSpamText } from '_mutations';
import {
  LoaderRing,
  FormGroup,
  FormInput,
  ImageLoader,
  ButtonDescription,
} from '_components/core';
import {
  getTranslation,
  displayPageLoader,
  successMessage,
  showAlertBox,
  dateLastLoginFormat,
  uploadFile,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ReportSpamText extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: {
        value:
					this.props.authUser.profile.fname +
					' ' +
					this.props.authUser.profile.lname,
        error: '',
        hasError: false,
      },
      location: {
        value: this.props.authUser.profile.municipality
          ? this.props.authUser.profile.municipality +
					  ', ' +
					  this.props.authUser.profile.province
          : '',
        error: '',
        hasError: false,
      },
      dateTime: {
        value: dateLastLoginFormat(this.props.authUser.loginDate),
      },
      attachment: {
        file: null,
        error: '',
        hasError: false,
      },
    };
    this.state = this.initialState;
  }

	onNameChange = (value) => {
	  this.setState({
	    name: {
	      ...this.state.name,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onLocChange = (value) => {
	  this.setState({
	    location: {
	      ...this.state.location,
	      value: value,
	      hasError: !Boolean(value),
	      error: !Boolean(value) ? 'REQUIRED' : '',
	    },
	  });
	};

	onDateTimeChange = (value) => {
	  this.setState({
	    dateTime: {
	      ...this.state.dateTime,
	      value: value,
	    },
	  });
	};

	onAttachmentChange = (file) => {
	  this.setState({
	    attachment: {
	      ...this.state.attachment,
	      file: file,
	    },
	  });
	};

	submitData = (image) => {
	  const newDate = new Date(this.state.dateTime.value);
	  let data_ = {
	    name: this.state.name.value,
	    location: this.state.location.value,
	    date_received: newDate.toISOString(),
	    image: image,
	  };

	  reportSpamText(data_).then((res) => {
	    displayPageLoader(false);
	    if (res && res.success) {
	      this.setState({
	        ...this.initialState,
	      });
	      successMessage({
	        pageTitle: getTranslation('PAGE_REPORT_SPAMTEXT'),
	        title: getTranslation('SPAMTEXT_SUBMIT_SUCCESS'),
	        message: getTranslation('SUBMIT_REPORT_SUCCESS'),
	        cbBack: () => {
	          route('/home', true);
	        },
	      });
	    } else {
	      showAlertBox({
	        message: res.message || 'OOPS_SOMETHING_WRONG',
	      });
	    }
	  });
	};

	handleContinue = () => {
	  if (!this.state.name.value || !this.state.location.value) {
	    this.onNameChange(this.state.name.value);
	    this.onLocChange(this.state.location.value);
	  } else {
	    displayPageLoader(true);
	    // if (!this.state.attachment.file) {
	    // 	this.submitData();
	    // } else {
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
	    // }
	  }
	};

	renderForm = () => {
	  return (
	    <>
	      <FormGroup
	        label={`${getTranslation('RECEIVER_NAME')}`}
	        className={style.formGroup}
	        hasError={this.state.name.hasError}
	      >
	        <FormInput
	          value={this.state.name.value}
	          onBlur={(e) => {
	            this.onNameChange(e.target.value, i);
	          }}
	          onInput={(e) => {
	            this.onNameChange(e.target.value, i);
	          }}
	          hasError={this.state.name.hasError}
	          error={this.state.name.error}
	        />
	      </FormGroup>
	      <FormGroup
	        label={getTranslation('RECEIVER_LOCATION')}
	        className={style.formGroup}
	        hasError={this.state.location.hasError}
	      >
	        <FormInput
	          value={this.state.location.value}
	          onBlur={(e) => {
	            this.onLocChange(e.target.value, i);
	          }}
	          onInput={(e) => {
	            this.onLocChange(e.target.value, i);
	          }}
	          hasError={this.state.location.hasError}
	          error={this.state.location.error}
	        />
	      </FormGroup>
	      <FormGroup
	        label={getTranslation('RECEIVED_DATE_TIME')}
	        className={style.formGroup}
	        hasError={this.state.dateTime.hasError}
	      >
	        <FormInput
	          value={this.state.dateTime.value}
	          onBlur={(e) => {
	            this.onDateTimeChange(e.target.value, i);
	          }}
	          onInput={(e) => {
	            this.onDateTimeChange(e.target.value, i);
	          }}
	        />
	      </FormGroup>
	      <FormGroup
	        label={''}
	        className={style.formGroup}
	        hasError={this.state.attachment.hasError}
	      >
	        <div className={style.attachmentWrap}>
	          <div className={style.attachmentInputWrap}>
	            {!this.state.attachment.file && (
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
	                dummy: this.state.attachment.file
	                  ? style.dummyInput
	                  : style.hidden,
	              }}
	              value={this.state.attachment.file}
	              type="file"
	              onBlur={(e) => {
	                this.onAttachmentChange(e.target.files[0]);
	              }}
	              onInput={(e) => {
	                this.onAttachmentChange(e.target.files[0]);
	              }}
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
	    </>
	  );
	};

	render = ({ authUser }, { spamTextItem }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.spamTextWrap}>
	      <div className={style.header}>
	        <p className={`bold ${style.title}`}>
	          {getTranslation('SPAMTEXT_TITLE')}
	        </p>
	        <p className={`${style.content}`}>
	          {getTranslation('SPAMTEXT_TEXT')}
	        </p>
	      </div>

	      <div className={style.spamTextForm}>
	        {this.renderForm(spamTextItem)}
	        <div className={style.buttonContainer}>
	          <ButtonDescription
	            onClickCallback={() => {
	              this.handleContinue();
	            }}
	            text={getTranslation('PAGE_REPORT_SPAMTEXT')}
	            buttonStyle={`${style.buttonStyle}`}
	            isDisabled={
	              !this.state.attachment.file ||
								!this.state.name.value ||
								!this.state.location.value
	            }
	          />
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(ReportSpamText);
