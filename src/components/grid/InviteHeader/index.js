import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader } from '_components/core';
import {
  getTranslation,
  showAlertBox,
  getConfigByKey,
  formatRank,
} from '_helpers';
import { nativeShare } from '_platform/helpers';
import copy from 'clipboard-copy';
import style from './style';
class InviteHeader extends Component {
	copyText = (text) => {
	  copy(text);
	  showAlertBox({
	    message: 'COPY_MSG_REFCODE',
	    success: true,
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
	    message: this.getCopyText(),
	  });
	};
	render = ({ authUser }) => (
	  <div className={style.inviteWrap}>
	    <div className={style.inviteHeaderWrap}>
	      <div className={style.recruit}>
	        <span className={`bold`}>{getTranslation('INVITE_RECRUIT_MSG')}</span>
	      </div>
	      <div className={style.refCodeWrap}>
	        <div className={style.referralCode}>
	          <p className={`${style.text}`}>
	            {getTranslation('REFERRAL_CODE')}:{' '}
	          </p>
	          <p id="copy-referral-code" className={`bold ${style.code}`}>
	            {authUser.profile.refCode}
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
	            src="assets/icons/share.png"
	            style={{ container: `${style.img}` }}
	            lazy
	          />
	          {getTranslation('SHARE')}
	        </button>
	      </div>
	    </div>
	    <div className={style.heroRanking}>
	      <div className={style.rankBox}>
	        <p class={style.rankPointsText}>{getTranslation('TOTAL_POINTS')}</p>
	        <p class={`bold ${style.count}`}>{formatRank(authUser.points)}</p>
	      </div>
	      <div className={style.rankBox}>
	        <p class={style.rankPointsText}>{getTranslation('TOTAL_INVITED')}</p>
	        <p class={`bold ${style.count}`}>{formatRank(authUser.members)}</p>
	      </div>
	    </div>
	  </div>
	);
}
export default connect(['authUser'])(InviteHeader);
