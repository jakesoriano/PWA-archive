/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { h, Component } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

// eslint-disable-next-line react/prefer-stateless-function
export default class SideBar extends Component {
	render = (props) => (
	  <div className={style.sideBarContainer}>
	    {/* eslint-disable-next-line react/self-closing-comp */}
	    <div
	      onClick={props.toggleSideBar}
	      className={props.isOpen ? style.rightSideBarOutside : null}
	    >
	    </div>
	    <div
	      className={
	        props.isOpen
	          ? `${style.rightSideBar} ${style.toggled}`
	          : style.rightSideBar
	      }
	    >
	      {/* Side Bar Contents Here */}
				Hello
	    </div>
	  </div>
	);
}
