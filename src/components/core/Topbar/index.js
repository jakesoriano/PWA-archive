import { h, Component } from 'preact';
import { getLogo } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
class Topbar extends Component {
	render = (props) => {
	  // eslint-disable-next-line react/destructuring-assignment
	  return (
	    <header id="topbar" className={style.topbar}>
	      <div id="topbar_container" className={style.container}>
	        <div id="topbar_logo" className={style.logo}>
	          <img alt="logo" src={getLogo()} />
	        </div>
	        <button
	          type="button"
	          id="topbar_link_right"
	          className={style.user}
	          onClick={props.toggleSideBar}
	          aria-label="Toggle Sidebar"
	        >
	          {/* eslint-disable-next-line template-curly-spacing*/}
	          <span className="icon-profile" />
	        </button>
	      </div>
	    </header>
	  );
	};
}
export default Topbar;
