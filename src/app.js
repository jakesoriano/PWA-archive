import { h, Component } from 'preact';
import { updateStore , store, restoreData } from '_unistore';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import { Provider } from 'unistore/preact';
import { LoaderRing } from '_components/core';

// Code-splitting is automated for routes
import Grid from '_routes/grid';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      restore: null
    };
  }

	componentWillMount = () => {};

	componentDidMount = () => {
	  restoreData().then((res) => {
	    this.setState({
	      restore: res
	    });
	  });
	};

	/** Gets fired when the route changes.
	 *	@param {Object} event		'change' event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (e) => {
	  updateStore({
	    route: e
	  }, true);
	};

	renderStyle = () => {
	  return `
			@font-face {
				font-family: 'OpenSans-ExtraBold';
				src: url('assets/fonts/OpenSans-ExtraBold.ttf?${process.env.BUILD_NO}') format('woff');
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				font-display: swap;
			}
			@font-face {
				font-family: 'OpenSans-Bold';
				src: url('assets/fonts/OpenSans-Bold.ttf?${process.env.BUILD_NO}') format('woff');
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				font-display: swap;
			}
			@font-face {
				font-family: 'OpenSans-SemiBold';
				src: url('assets/fonts/OpenSans-SemiBold.ttf?${process.env.BUILD_NO}') format('woff');
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				font-display: swap;
			}
			@font-face {
				font-family: 'OpenSans-Regular';
				src: url('assets/fonts/OpenSans-Regular.ttf?${process.env.BUILD_NO}') format('woff');
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				font-display: swap;
			}
			@font-face {
				font-family: 'OpenSans-Light';
				src: url('assets/fonts/OpenSans-Light.ttf?${process.env.BUILD_NO}') format('woff');
				font-weight: normal;
				font-style: normal;
				font-stretch: normal;
				font-display: swap;
			}
		`;
	};

	render () {
	  // eslint-disable-next-line react/destructuring-assignment
	  if (this.state.restore === null) {
	    return <LoaderRing fullpage />;
	  }

	  return (
	  // eslint-disable-next-line react/jsx-fragments
	    <>
	      <main id="app">
	        <Provider store={store}>
	          <Router history={createHashHistory()} onChange={this.handleRoute}>
	            <Grid path="/" page="landing" />
	            <Grid path="/:page/:popup?" />
	          </Router>
	        </Provider>
	      </main>
	      <style type="text/css">{this.renderStyle()}</style>
	    </>
	  );
	}
}
