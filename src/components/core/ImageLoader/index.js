/** @format */

import { h, Component } from 'preact';
import { replaceUrlPlaceholders } from '_helpers';
// eslint-disable-next-line import/extensions
import style from './style';

const memoizedGetFileName = {};
const loadedSrcs = [];
let observer = null;

let isObserverSupported = false;
let shouldLazyLoad = true;
if (typeof window !== 'undefined') {
  shouldLazyLoad = window.location.href.indexOf('lazyloader=false') < 0;
  isObserverSupported = Boolean('IntersectionObserver' in window);
}

function imageLoadedSuccessfully (ev) {
  // eslint-disable-next-line no-use-before-define
  clearListeners(ev);

  if (loadedSrcs.indexOf(ev.target.src) < 0) {
    loadedSrcs.push(ev.target.src);
  }

  ev.target.parentElement.classList.remove(style.notLoaded);

  if (ev.target.dataset.lazy) {
    ev.target.classList.add(style.popIn);
  }
}

function failedToLoadImage (ev) {
  // eslint-disable-next-line
	console.log(`SPA >> ImageLoader: failedToLoadImage ${ev.target.src}`);
  // eslint-disable-next-line no-use-before-define
  clearListeners(ev);
}

function clearListeners (ev) {
  ev.target.removeEventListener('load', imageLoadedSuccessfully);
  ev.target.removeEventListener('error', failedToLoadImage);
}

function loadImage (target) {
  // eslint-disable-next-line no-param-reassign
  target.src = target.dataset.src;
  target.addEventListener('load', imageLoadedSuccessfully);
  target.addEventListener('error', failedToLoadImage);
}

function getFileName (path) {
  try {
    if (path in memoizedGetFileName === false) {
      const paths = path.split('/');
      memoizedGetFileName[path] = paths[paths.length - 1];
    }
  } catch (err) {}

  return memoizedGetFileName[path];
}

export default class ImageLoader extends Component {
  constructor (props) {
    super(props);

    if (isObserverSupported && !observer) {
      observer = new IntersectionObserver((entries) => {
        const len = entries.length;

        for (let a = 0; a < len; a++) {
          if (
            entries[a].intersectionRatio >= 0.1 ||
						entries[a].isIntersecting
          ) {
            observer.unobserve(entries[a].target);
            loadImage(entries[a].target.childNodes[0]);
          }
        }
      });
    }
  }

	componentDidMount = () => {
	  if (
	    isObserverSupported &&
			loadedSrcs.indexOf(this.lazyImage.dataset.src) < 0 &&
			this.props.lazy &&
			shouldLazyLoad
	  ) {
	    observer.observe(this.imageHolder);
	  }
	};

	componentDidUpdate = (prevProps) => {
	  if (isObserverSupported && prevProps.src !== this.props.src) {
	    this.imageHolder.classList.add('not-loaded');
	    loadImage(this.lazyImage);
	  }
	};

	render = () => {
	  const src = replaceUrlPlaceholders(this.props.src);
	  const loadImmediately =
			!isObserverSupported ||
			!this.props.lazy ||
			!shouldLazyLoad ||
			loadedSrcs.indexOf(src) > -1;

	  return (
	    <div
	      className={`imgWrap 
          ${style.imageLoader} 
          ${loadImmediately ? '' : style.notLoaded} 
          ${
						this.props.style && this.props.style.container
						  ? this.props.style.container
						  : ''
					}
        `}
	      ref={(el) => {
	        if (el) {
	          this.imageHolder = el;
	        }
	      }}
	    >
	      <img
	        alt={this.props.alt || getFileName(this.props.src)}
	        className={`clickable ${
	          this.props.style && this.props.style.image
	            ? this.props.style.image
	            : ''
	        }`}
	        src={loadImmediately ? src : null}
	        data-src={src}
	        data-lazy={this.props.lazy && shouldLazyLoad && !loadImmediately}
	        ref={(el) => {
	          this.lazyImage = el;
	        }}
	      />
	    </div>
	  );
	};
}
