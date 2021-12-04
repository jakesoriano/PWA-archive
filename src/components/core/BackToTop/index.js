/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prefer-stateless-function */
import { h, Component } from 'preact';
// eslint-disable-next-line import/extensions
import style from './style';

class BackToTop extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showBtn: false
    };
  }

	setButtonDisplay = (elem) => {
	  const { threshold, selector } = this.props;
	  const { showBtn } = this.state;
	  const scrollPos = selector ? elem.scrollTop : elem.scrollY;
	  const nextState = scrollPos > (threshold || 50);
	  if (nextState !== showBtn) {
	    this.setState({
	      showBtn: nextState
	    });
	  }
	};

	componentDidMount = () => {
	  try {
	    // BEGIN LISTENING ON SCROLL EVENT
	    const { scrollEnd, selector } = this.props;
	    // set selector as scrollable div or use window
	    const pageEl = selector ? document.querySelector(`${selector}`) : window;
	    let isScrolling = null;

	    pageEl.onscroll = () => {
	      if (scrollEnd) {
	        window.clearTimeout(isScrolling);
	        isScrolling = setTimeout(() => {
	          window.clearTimeout(isScrolling);
	          this.setButtonDisplay(pageEl);
	        }, 50);
	      } else {
	        this.setButtonDisplay(pageEl);
	      }
	    };
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.log('BackToTop Component Error', err);
	  }
	};

	scrollToTop = () => {
	  try {
	    const { selector } = this.props;
	    // set selector as scrollable div or use window
	    const pageEl = selector ? document.querySelector(`${selector}`) : window;
	    pageEl.scrollTo({ top: 0, behavior: 'smooth' });
	  } catch (err) {
	    // eslint-disable-next-line no-console
	    console.log('BackToTop Component >> scrollToTop() > Error', err);
	  }
	};

	render = () => {
	  const { showBtn } = this.state;
	  return (
	    <div
	      className={
	        showBtn ? `${style.backtotop} ${style.active}` : `${style.backtotop}`
	      }
	      onClick={() => {
	        this.scrollToTop();
	      }}
	    >
	      <span />
	    </div>
	  );
	};
}

export default BackToTop;
