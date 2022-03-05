import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import { getTranslation, showAlertBox, getConfigByKey } from '_helpers';
import { nativeShare } from '_platform/helpers';
import copy from 'clipboard-copy';
import style from './style';
class InviteHeader extends Component {
  copyText = (text) => {
	  copy(text);
	  showAlertBox({
	    message: 'COPY_MSG_REFCODE',
	    success: true
	  });
	  };
  getCopyText = () => {
	  return `Come join us, be a KakamPink!\n\n
			Download now!\n
			Android: ${getConfigByKey('playStore')}\n
			iOS: ${getConfigByKey('appStore')}\n\n
			Use my invite code: ${this.props.authUser.profile.refCode}
		`;
	  };
	onShare = () => {
	  nativeShare({
	    title: `Be a KakamPink`,
	    message: this.getCopyText()
	  });
	};
  render = ({ authUser }) => (
    <div className={style.inviteHeaderWrap}>
      <div className={style.recruit}>
        <span className={`extraBold`}>{getTranslation('INVITE_RECRUIT_MSG')}</span>
      </div>
      <div className={style.referralCode}>
        <p className={`${style.text}`}>{getTranslation('YOUR_REFERRAL_CODE')} </p>
        <p onClick={() => {
          this.copyText(authUser.profile.refCode);
        }}
        id="copy-referral-code"
        className={`extraBold ${style.code}`}>
          {authUser.profile.refCode}
          <ImageLoader
            src="assets/icons/icon_copy_blue.png"
            style={{ container: `${style.copyImg}` }}
            lazy
          />
        </p>
      </div>
      <button
        onClick={() => {
          this.onShare();
        }}
        id="invite-share"
        className={`bold ${style.updateProfile}`}
      >
        <ImageLoader
          src="assets/images/share_invite.png"
          style={{ container: `${style.img}` }}
          lazy
        />
        {getTranslation('SHARE')}</button>
    </div>
  );
}
export default connect(['authUser'])(InviteHeader);
