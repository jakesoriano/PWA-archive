import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
// import { sendIncidentReport } from '_mutations';
import { applyPollWatcher } from '_mutations';
import {
  LoaderRing,
  FormGroup,
  FormInput,
  ImageLoader,
  ButtonDescription,
} from '_components/core';
import {
  getTranslation,
  successMessage,
  displayPageLoader,
  showAlertBox,
} from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class PollWatcher extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      completeProfileCheck: {
        checked: false,
      },
    };
    this.state = this.initialState;
  }

	submitData = () => {
	  applyPollWatcher().then((res) => {
	    displayPageLoader(false);
	    if (res && res.success) {
	      this.setState({
	        ...this.initialState,
	      });
	      successMessage({
	        pageTitle: getTranslation('PAGE_POLLWATCHER'),
	        title: getTranslation('SUBMIT_SUCCESS'),
	        message: this.props.text,
	        cbBack: () => {
	          route('/home', true);
	        },
	      });
	    } else {
	      showAlertBox({
	        message: res.errMessage || 'OOPS_SOMETHING_WRONG',
	      });
	    }
	  });
	};

	handleContinue = () => {
	  if (this.state.completeProfileCheck.checked && this.validateRequirement()) {
	    this.submitData();
	  }
	};

	validateRequirement = () => {
	  const isProfileUpdated = this.props.authUser.profile.barangay
	    ? true
	    : false;
	  return isProfileUpdated;
	};

	render = ({ authUser }, { completeProfileCheck }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <div className={style.pollWatcherWrap}>
	      <div className={style.header}>
	        <p className={`bold ${style.title}`}>
	          {getTranslation('POLLWATCHER_TITLE')}
	        </p>
	        <iframe
	          className={style.video}
	          width="100%"
	          height="300"
	          frameBorder="0"
	          src={this.props.video}
	        ></iframe>
	        <p className={`${style.content}`}>
	          {getTranslation('POLLWATCHER_CONTENT')}
	        </p>
	      </div>

	      <div className={style.requirements}>
	        <p className={`bold ${style.title}`}>
	          {getTranslation('REQUIREMENTS')}
	        </p>
	        <div className={style.rItem}>
	          <ImageLoader
	            src={`${
								authUser.profile.barangay
								  ? 'assets/icons/red_check.svg'
								  : 'assets/icons/gray_check.svg'
							}`}
	            // style={{ container: `${style.dropdown} ${authUser.profile.active ? style.active : ''}` }}
	            style={{ container: `${style.checkImg}` }}
	          />
	          <p className={style.cLabel}>{getTranslation('COMPLETE_PROFILE')}</p>
	          <div className={style.btnWrap}>
	            <ButtonDescription
	              onClickCallback={() => {
	                if (!authUser.profile.barangay) {
	                  route('/update-profile');
	                }
	              }}
	              text={`${
									authUser.profile.barangay
									  ? getTranslation('COMPLETED')
									  : getTranslation('UPDATE_PROFILE')
								}`}
	              buttonStyle={`light ${
									!authUser.profile.barangay
									  ? style.buttonActive
									  : style.buttonInactive
								}`}
	            />
	          </div>
	        </div>
	      </div>
	      {authUser.profile.pollWatcher && (
	        <p className={`bold ${style.message}`}>{this.props.text}</p>
	      )}
	      {!authUser.profile.pollWatcher && (
	        <>
	          <FormGroup>
	            <FormInput
	              type="checkbox"
	              label={getTranslation('SUBMIT_PROFILE_MSG')}
	              onClick={() => {
	                this.setState({
	                  completeProfileCheck: {
	                    ...completeProfileCheck,
	                    checked: !completeProfileCheck.checked,
	                  },
	                });
	              }}
	              checked={completeProfileCheck.checked}
	              name="agreeToTerms"
	              className={style.checkBox}
	              style={{
	                container:
										completeProfileCheck.required &&
										!completeProfileCheck.checked
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
	              text={getTranslation('SUBMIT_APPLICATION')}
	              buttonStyle={`${
									completeProfileCheck.checked && this.validateRequirement()
									  ? style.buttonStyle
									  : style.buttonDisabled
								}`}
	            />
	          </div>
	        </>
	      )}
	    </div>
	  );
	};
}
export default connect(['authUser'])(PollWatcher);
