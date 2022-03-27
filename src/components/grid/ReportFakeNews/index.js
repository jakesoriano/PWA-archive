import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
// import { sendIncidentReport } from '_mutations';
import { reportFakeNews } from '_mutations';
import {
  LoaderRing,
  FormGroup,
  FormInput,
  FormDropdown,
  ButtonDescription,
} from '_components/core';
import {
  getTranslation,
  displayPageLoader,
  showAlertBox,
  getFakeNewsCategories,
  validateDomain,
  convertUrl,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ReportFakeNews extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      categoryOptions: getFakeNewsCategories(),
      link: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      category: {
        value: '',
        error: '',
        message: '',
        hasError: false,
      },
      desc: {
        value: '',
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

	onLinkChange = (value) => {
	  this.setState({
	    link: {
	      ...this.state.link,
	      value: value,
	      hasError: !Boolean(validateDomain(value)),
	      error: !Boolean(validateDomain(value)) ? 'Invalid link' : '',
	    },
	  });
	};

	onDescChange = (value) => {
	  this.setState({
	    desc: {
	      ...this.state.desc,
	      value: value,
	    },
	  });
	};

	submitData = () => {
	  const newUrl = convertUrl(this.state.link.value);
	  let data_ = {
	    url: newUrl,
	    category: this.state.category.value,
	    description: this.state.desc.value,
	  };
	  reportFakeNews(data_).then((res) => {
	    displayPageLoader(false);
	    if (res && res.success) {
	      this.setState({
	        ...this.initialState,
	      });
	      showAlertBox({
	        message: 'FAKENEWS_SUBMIT_SUCCESS',
	        success: true,
	      });
	      // successMessage({
	      //   pageTitle: getTranslation('NANAYS_FOR_LENI'),
	      //   title: getTranslation('FAKENEWS_SUBMIT_SUCCESS'),
	      //   cbBack: () => {
	      //     route('/home', true);
	      //   },
	      // });
	    } else {
	      showAlertBox({
	        message: res.message || 'OOPS_SOMETHING_WRONG',
	      });
	    }
	  });
	};

	handleContinue = () => {
	  if (
	    this.state.link.hasError ||
			!this.state.link.value ||
			!this.state.category.value ||
			!this.state.agreeToTerms.checked ||
			!this.state.shareLocation.checked ||
			!this.state.shareContact.checked
	  ) {
	    this.onCheckTerms();
	    this.onCheckShareLoc();
	    this.onCheckShareContact();
	    this.onLinkChange(this.state.link.value);
	    this.onCategoryChange(this.state.category.value);
	  } else {
	    displayPageLoader(true);
	    this.submitData();
	  }
	};

	// validateFormInputs = () => {
	// 	let valid = true;
	// 	this.state.fakeNewsItem.map((e,i) => {
	// 		if(e.link.value === '') {
	// 			this.onLinkChange(e.link.value, i);
	// 			valid = false;
	// 		}
	// 	});
	//   return valid;
	// };

	// addLink = () => {
	// 	let newData = this.state.fakeNewsItem;
	// 	newData.push(this.initialState.fakeNewsItem[0]);
	// 	this.setState({
	//     fakeNewsItem: newData,
	//   });
	// }

	// deleteLink = (i) => {
	// 	let newData = this.state.fakeNewsItem;
	// 	newData.splice(i, 1);
	// 	this.setState({
	//     fakeNewsItem: newData,
	//   });
	// }

	renderForm = () => {
	  // if (data && data.length) {
	  // return	data.map((item, i) => {
	  return (
	    <>
	      <FormGroup
	        label={`${getTranslation('FAKE_NEWS_LINK')}`}
	        className={style.formGroup}
	      >
	        {/* {data.length > 1 && <p onClick = {(e) => {
								this.deleteLink(i);
							}}>{getTranslation('REMOVE')}</p>} */}
	        <FormInput
	          className={style.email}
	          style={{ error: style.email }}
	          value={this.state.link.value}
	          type="text"
	          placeholder={getTranslation('LINK_PLACEHOLDER')}
	          onBlur={(e) => {
	            this.onLinkChange(e.target.value, i);
	          }}
	          onInput={(e) => {
	            this.onLinkChange(e.target.value, i);
	          }}
	          hasError={this.state.link.hasError}
	          error={this.state.link.error}
	          message={this.state.link.message}
	        />
	      </FormGroup>
	      <FormGroup
	        label={getTranslation('CATEGORY')}
	        hasError={this.state.category.hasError}
	        className={style.formGroup}
	      >
	        <FormDropdown
	          label=""
	          className={style.category}
	          value={this.state.category.value}
	          options={this.state.categoryOptions}
	          getValue={(option) => option.value}
	          getText={(option) => option.text}
	          onBlur={(e) => {
	            this.onCategoryChange(e.target.value, i);
	          }}
	          onChange={(e) => {
	            this.onCategoryChange(e.target.value, i);
	          }}
	          hasError={this.state.category.hasError}
	          error={this.state.category.error}
	          message={this.state.category.message}
	        />
	      </FormGroup>
	      <FormGroup
	        label={getTranslation('CONTENT_DESC')}
	        className={style.formGroup}
	      >
	        <FormInput
	          className={style.email}
	          style={{ error: style.email }}
	          value={this.state.desc.value}
	          type="textarea"
	          rows="2"
	          placeholder={getTranslation('DESC_PLACEHOLDER')}
	          onBlur={(e) => {
	            this.onDescChange(e.target.value, i);
	          }}
	          onInput={(e) => {
	            this.onDescChange(e.target.value, i);
	          }}
	          hasError={this.state.desc.hasError}
	          error={this.state.desc.error}
	          message={this.state.desc.message}
	        />
	      </FormGroup>
	    </>
	  );
	  // })
	  // }
	  // return <p className={style.noRecord}>{getTranslation('NO_DATA')}</p>
	};

	render = (
	  { authUser },
	  { fakeNewsItem, shareLocation, shareContact, agreeToTerms }
	) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.fakeNewsWrap}>
	      <div className={style.header}>
	        <p className={`bold ${style.title}`}>
	          {getTranslation('FAKENEWS_TITLE')}
	        </p>
	        <p className={`${style.content}`}>
	          {getTranslation('FAKENEWS_TEXT')}
	        </p>
	      </div>

	      <div className={style.fakeNewsForm}>
	        {this.renderForm(fakeNewsItem)}
	        {/* <ButtonDescription
	          onClickCallback={() => {
	            this.addLink();
	          }}
	          text={getTranslation('ADD_LINK')}
	          buttonStyle={`${style.addLink}`}
	          icon="assets/icons/plus.svg"
	          iconStyle={style.iconStyle}
	        /> */}
	        <FormGroup className={style.checkBoxGroup}>
	          <FormInput
	            id="location"
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
	            id="contacts"
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
	            id="terms"
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
	        <div className={style.buttonContainer}>
	          <ButtonDescription
	            onClickCallback={() => {
	              this.handleContinue();
	            }}
	            text={getTranslation('PAGE_REPORT_FAKENEWS')}
	            buttonStyle={`${style.buttonStyle}`}
	          />
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default connect(['authUser'])(ReportFakeNews);
