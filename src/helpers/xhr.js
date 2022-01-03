import { store } from '_unistore';
import {
  getLanguageInfo,
  platform,
  displayPageLoader
} from '_helpers';
import XHRWorker from '_workers/XHRWorker';
import { getCurrencyCode } from './language';
import { logOut } from '_mutations';

const xhrInstances = {};
// eslint-disable-next-line import/prefer-default-export
export function xhr (url, options, externalAPI) {
  if (
    xhrInstances[url] &&
		(!options ||
			(options && options.method && options.method.toLowerCase() !== 'post'))
  ) {
    xhrInstances[url].terminate();
    xhrInstances[url] = null;

    // eslint-disable-next-line
		console.log(`SPA >> Terminated xhr worker. ${url}`);
  }

  return new Promise((resolve, reject) => {
    const requestWorker = new XHRWorker();
    xhrInstances[url] = requestWorker;

    // worker response
    requestWorker.onmessage = (ev) => {

      if ('result' in ev.data) {
        resolve(ev.data.result);
      } else if (ev.data && ev.data.status === 401){
        // Unauthorized
        logOut();
        displayPageLoader();
        reject(null);
      } else if ('error' in ev.data) {
        reject(ev.data);
      }
      // reset worker
      requestWorker.terminate();
      xhrInstances[url] = null;

      // eslint-disable-next-line
			console.log(`SPA >> xhr (${url}) : [completed] worker terminated.`);

      resolve();
    };

    const { authUser, selectedLanguage } = store.getState();
    // worker call
    requestWorker.postMessage({
      url,
      options,
      authUser,
      language: getLanguageInfo(selectedLanguage),
      currencyCode: getCurrencyCode(selectedLanguage),
      publicPath: process.env.PUBLIC_PATH,
      platform,
      externalAPI
    });
  });
}
