import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { displayUserRole, getTranslation, displayName } from '_helpers';
import { ImageLoader } from '_components/core';
import { Link } from 'preact-router/match';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class ProfileHeader extends Component {
	floatLinks = () => {
	  return (
	    <div className={style.infoWrap}>
	      <div className={style.info}>
	        <div className={style.content}>
	          <Link
	            id="tab-home"
	            class={style.menu}
	            activeClassName={style.active}
	            href="/profile/update-profile"
	          >
	            <ImageLoader
	              src={`assets/icons/bb_prof.png`}
	              style={{ container: style.imgCont }}
	            />
	            <p className={`${style.title}`}>
	              {getTranslation('UPDATE_PROFILE')}
	            </p>
	          </Link>
	          <div className={style.divider}></div>
	          <Link
	            id="tab-invite"
	            class={style.menu}
	            activeClassName={style.active}
	            href="/invite"
	          >
	            <ImageLoader
	              src={`assets/icons/bb_invite.png`}
	              style={{ container: style.imgCont }}
	            />
	            <p className={`${style.title}`}>
	              {getTranslation('PAGE_INVITE')}
	            </p>
	          </Link>
	          <div className={style.divider}></div>
	          <Link
	            id="tab-tasks"
	            class={style.menu}
	            activeClassName={style.active}
	            href="/leaderboard"
	          >
	            <ImageLoader
	              src={`assets/icons/bb_lead.png`}
	              style={{ container: style.imgCont }}
	            />
	            <p className={`${style.title}`}>
	              {getTranslation('PAGE_LEADERBOARD')}
	            </p>
	          </Link>
	        </div>
	      </div>
	    </div>
	  );
	};

	userInfo = () => {
	  const { authUser } = this.props;
	  return (
	    <div className={`${style.dismissTextWrap}`}>
	      <div className={style.sUser}>
	        <ImageLoader
	          src={
							authUser?.profile?.image ||
							'assets/images/myaccount_icon_inactive.png'
	          }
	          style={{ container: style.sAvatar }}
	          lazy
	        />
	        <div>
	          <div>
	            <p className={`extraBold ${style.sName}`}>
	              {displayName(authUser?.profile)}
	            </p>
	          </div>
	        </div>
	      </div>
	      <div className={style.extraInfo}>
	        <div>
						Hero Pts. <span>{authUser?.points}</span>
	        </div>
	        <div className={style.divider}></div>
	        <div>
						Level: <span>{displayUserRole()}</span>
	        </div>
	      </div>
	    </div>
	  );
	};

	render = ({}) => {
	  return (
	    <div className={style.profileHeaderContainer}>
	      {/* text */}
	      {this.userInfo()}
	      {/* countdown */}
	      <div className={style.countdownCont}>{this.floatLinks()}</div>
	    </div>
	  );
	};
}

export default connect(['authUser'])(ProfileHeader);
