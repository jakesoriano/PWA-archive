import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { LoaderRing, ImageLoader } from '_components/core';
import {
  getTranslation,
  showAlertBox
} from '_helpers';
import copy from 'clipboard-copy';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class ReferralCode extends Component {
  constructor(props) {
    super(props);
  }

	copyText = (text) =>{
	  copy(text);
	  showAlertBox({
	    message: 'COPY_MSG_REFCODE',
	    success: true
	  });
	};

	render = ({ authUser }) => {
	  if (!authUser) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	    <button id="copy-referral-code"
	      className={style.referralCode}
	      onClick={() => {
	        this.copyText(authUser.profile.refCode);
	      }}>
	      <p className={`${style.text}`}>{getTranslation('REFERRAL_CODE')}:</p>
	      <p className={`extraBold ${style.code}`}>{authUser.profile.refCode}</p>
	      <ImageLoader
	        src="assets/images/copy.png"
	        style={{ container: `${style.copyImg}` }}
	      />
	    </button>
	  );
	};
}
export default connect(['authUser'])(ReferralCode);
