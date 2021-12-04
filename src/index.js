/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import './style';
// es6 polyfills
import './polyfills/arrayFind';
import './polyfills/arrayFilter';
import './polyfills/arrayFindIndex';
// App
import App from './app';

export default App;

// dislabed logs
function noop () {}
if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'PROD') {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}
