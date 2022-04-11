import { h, Component } from 'preact';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { Link } from 'preact-router/match';
import { getTranslation } from '_helpers';
import { ImageLoader } from '_components/core';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Topbar extends Component {
	render = (props) => {
	  // eslint-disable-next-line react/destructuring-assignment
	  return (
	    <header
	      id="topbar"
	      className={`${style.topbar} ${props.withBack ? style.withBack : ''}`}
	    >
	      <div id="tb-container" className={style.container}>
	        {/* Burger or Back */}
	        {!props.withBack ? (
	          <button
	            type="button"
	            id="tb-burger"
	            className={style.burger}
	            onClick={props.toggleSideBar}
	            aria-label="Toggle Sidebar"
	          >
	            <ImageLoader
	              style={{ container: style.burgerImg }}
	              src="assets/images/burger.png"
	            />
	          </button>
	        ) : (
	          <button
	            type="button"
	            id="tb-back"
	            className={style.btnBack}
	            onClick={(e) => {
	              e.stopPropagation();
	              try {
	                if (
	                  this.props.route &&
										this.props.route.url &&
										this.props.route.url.indexOf('community-') > -1
	                ) {
	                  this.props.route.router.props.history.goBack();
	                } else if (
	                  this.props.route &&
										this.props.route.url &&
										this.props.route.url.indexOf('messages') > -1
	                ) {
	                  this.props.route.router.props.history.goBack();
	                } else if (
	                  this.props.route &&
										this.props.route.url &&
										this.props.route.url === '/videos'
	                ) {
	                  this.props.route.router.props.history.goBack();
	                } else if (
	                  this.props.route &&
										this.props.route.url &&
										this.props.route.url.indexOf('lawyers-for-chel-') > -1
	                ) {
	                  this.props.route.router.props.history.goBack();
	                } else if (
	                  this.props.route &&
										this.props.route.url &&
										this.props.route.url.indexOf('cs-transactions') > -1
	                ) {
	                  this.props.route.router.props.history.goBack();
	                } else {
	                  props.onBack();
	                }
	              } catch (err) {
	                props.onBack();
	              }
	            }}
	            aria-label="Toggle Sidebar"
	          >
	            <ImageLoader
	              style={{ container: style.backImg }}
	              src="assets/images/backbutton.png"
	            />
	          </button>
	        )}
	        {/* page title */}
	        <h1 id="tb-title" className={`extraBold ${style.title}`}>
	          {props.title && props.withBack ? (
	            getTranslation(props.title)
	          ) : (
	            <>
	              <ImageLoader
	                src={'assets/icons/pink_ribbon.png'}
	                style={{ container: style.logo }}
	              />
								LENI 2022
	            </>
	          )}
	        </h1>
	        {/* notification */}
	        {!props.withBack && (
	          <Link
	            id="tb-notif"
	            class={style.notif}
	            activeClassName={style.active}
	            href="/notification"
	            onClick={() => {
	              let { notifications } = this.props;
	              Object.assign(notifications, {
	                ...notifications,
	                isRead: true,
	              });
	              updateStore({
	                notifications: notifications,
	              });
	            }}
	          >
	            <ImageLoader
	              style={{ container: style.notifImg }}
	              src="assets/images/notificationbell.png"
	            />
	            {props.notifications.data.length &&
							!props.notifications.isRead ? (
	                <span className={style.notifCount}>
	                  {props.notifications.data.length}
	                </span>
	              ) : (
	                ''
	              )}
	          </Link>
	        )}
	      </div>
	    </header>
	  );
	};
}
export default connect(['route'])(Topbar);
