import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { getLogo } from '_helpers';
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
						<ImageLoader style={{container: style.burgerImg}} src={`assets/images/icon_invite_default.png`} />
	        </button>
	        <div id="topbar_logo" className={style.logo}>
	          <img alt="logo" src={getLogo()} />
	        </div>
					<Link class={style.notif} activeClassName={style.active} href="/notification">
						<ImageLoader style={{container: style.notifImg}} src={`assets/images/icon_invite_default.png`} />
					</Link>
	      </div>
	    </header>
	  );
	};
}
export default Topbar;
