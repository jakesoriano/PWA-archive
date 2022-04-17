import { Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';
import { getTranslation, isCommunityLeader } from '_helpers';
import style from './style';

class BeACommunityLeader extends Component {
	render = ({ page }) => {
	  if (isCommunityLeader()) {
	    return;
	  }
	  return (
	    <div className={style.hfWrap}>
	      <p className={`bold ${style.title}`}>{getTranslation('BE_A_LEADER')}</p>
	      <div>
	        <div
	          className={`${style.navBox}`}
	          id="be-community-leader"
	          onClick={() => route(`${page}/account-profile`)}
	        >
	          <p className="semiBold">
	            {getTranslation('I_WANT_TO_BE_COMMUNITY_LEADER')}
	          </p>
	        </div>
	      </div>
	    </div>
	  );
	};
}
export default BeACommunityLeader;
