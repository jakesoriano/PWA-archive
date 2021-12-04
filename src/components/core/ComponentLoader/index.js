/** @format */

import { h, Component } from 'preact';
import { getQueryStringValue } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

let isObserverSupported = false;
if (typeof window !== 'undefined') {
  isObserverSupported = Boolean('IntersectionObserver' in window);
}

export default class ComponentLoader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      display: false
    };
    this.observer = null;
    this.disabledLazyLoad =
			Boolean(getQueryStringValue('lazyload') === 'false') ||
			this.props.disabledLazyLoad;

    if (isObserverSupported && !this.observer && !this.disabledLazyLoad) {
      this.observer = new IntersectionObserver((entries) => {
        const len = entries.length;

        for (let a = 0; a < len; a++) {
          if (
            entries[a].intersectionRatio >= 0.1 ||
						entries[a].isIntersecting
          ) {
            this.observer.unobserve(entries[a].target);
            this.setState({ display: true });
          }
        }
      });
    }
  }

	componentDidMount = () => {
	  if (isObserverSupported && !this.disabledLazyLoad && this.lazyComponent) {
	    this.observer.observe(this.lazyComponent);
	  }
	};

	render = () => {
	  const { id, className } = this.props;
	  const loadComponent =
			!isObserverSupported || this.disabledLazyLoad ? true : this.state.display;

	  return (
	    <div
	      id={`${id || ''}`}
	      className={`${className || ''} ${
	        !loadComponent ? style.notLoaded : ''
	      }`}
	      ref={(el) => {
	        this.lazyComponent = el;
	      }}
	    >
	      {loadComponent ? this.props.children : null}
	    </div>
	  );
	};
}
