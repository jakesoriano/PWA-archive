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
	    <header id="topbar" className={style.topbar}>
	      <div id="topbar_container" className={style.container}>
	        <button
	          type="button"
	          id="topbar_link_left"
	          className={style.burger}
	          onClick={props.toggleSideBar}
	          aria-label="Toggle Sidebar"
	        >
	          <ImageLoader
	            style={{ container: style.burgerImg }}
	            src="assets/images/burger.png"
	          />
	        </button>
	        <h1 id="topbar_title" className={style.title}>
	          {props.title ? getTranslation(props.title) : ''}
	        </h1>
	        <Link
	          class={style.notif}
	          activeClassName={style.active}
	          href="/notification"
						onClick={() => {
							let { notifications } = this.props;
							Object.assign(notifications, {
								...notifications,
								isRead: true
							});
							updateStore({
								notifications: notifications
							});
						}}
	        >
	          <ImageLoader
	            style={{ container: style.notifImg }}
	            src="assets/images/notif.png"
	          />
						{props.notifications.data.length && !props.notifications.isRead ? <span className={style.notifCount}>{props.notifications.data.length}</span> : ''}
	        </Link>
	      </div>
	    </header>
	  );
	};
}
export default Topbar;
