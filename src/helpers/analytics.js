/** @format */
import { store } from '_unistore';
import {
  platform,
  getCookie,
  webInfo,
  isSkynetEnabled,
  getSkynetAPI
} from '_helpers';
import SkynetWorker from '_workers/SkynetWorker';

const maxChar = 128;

// connection type
let connectionType = '';
try {
  const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;
  connectionType = (connection && connection.effectiveType) || '';
  connection.addEventListener('change', () => {
    connectionType = connection.effectiveType;
  });
} catch (err) {}

// eslint-disable-next-line import/prefer-default-export
export function logCustomEvent (data) {
  // data needed
  const { selectedLanguage, authUser, deviceId } = store.getState();
  if (!isSkynetEnabled()) {
    return false;
  }
  // Default Data
  // eslint-disable-next-line no-param-reassign
  data = {
    ...data,
    stage: process.env.STAGE || 'Local',
    spfid: platform.spfid,
    'p-av': process.env.BUILD_NO,
    'p-src': process.env.PROJECT,
    userAgent: webInfo.userAgent,
    // eventName: ,
    from: decodeURIComponent(getCookie(`${process.env.PREFIX}PrevPage`)),
    page: decodeURIComponent(getCookie(`${process.env.PREFIX}LastPage`)),
    eventTimestamp: Date.now(),
    language: selectedLanguage,
    platform: platform.apiPlatform,
    fingerprint: deviceId || '',
    connectionType
  };

  // User data
  if (authUser) {
    // eslint-disable-next-line no-param-reassign
    data = {
      ...data,
      currency: authUser.CurrencyCode,
      rGroup: authUser.RiskId,
      productToken: authUser.ProductToken,
      isTestAccount: authUser.IsTestAccount
    };
  }
  // eslint-disable-next-line no-use-before-define
  return processEvent(formatData(data));
}

function formatData (data) {
  let result = {};
  // eslint-disable-next-line no-restricted-syntax
  Object.keys(data).forEach((key) => {
    try {
      if (key === 'gameTrackingId') {
        result = {
          ...result,
          // eslint-disable-next-line no-use-before-define
          ...appendGameData(key, data[key])
        };
      } else if (data[key] && data[key] instanceof Array) {
        // eslint-disable-next-line no-use-before-define
        result[key] = limitChars(
          data.eventName,
          key,
          JSON.stringify(data[key])
        );
      } else if (data[key] && typeof data[key] === 'object') {
        // eslint-disable-next-line no-use-before-define
        result[key] = limitChars(
          data.eventName,
          key,
          JSON.stringify(data[key])
        );
      } else {
        // eslint-disable-next-line no-use-before-define
        result[key] = limitChars(data.eventName, key, data[key]);
      }
    } catch (err) {}
  });
  return result;
}

let events = [];
function processEvent (data) {
  if (
    process.env.ANALYTICS_ENABLED &&
		process.env.ANALYTICS_ENABLED === 'true'
  ) {
    if (!events.find((i) => i === data.eventName)) {
      events.push(data.eventName);
      setTimeout(() => {
        events = events.filter((i) => i !== data.eventName);

        // eslint-disable-next-line no-console
        console.log('Analytics logCustomEvent', data);

        // skynet
        // eslint-disable-next-line no-use-before-define
        skynetEvent(data);
      }, 250);
    }
  }
}

function skynetEvent (data) {
  const skynetAPI = getSkynetAPI();
  if (skynetAPI) {
    // eslint-disable-next-line
		console.log(`SPA >> Skynet Analytics Event Tracker`, data);

    const Worker = new SkynetWorker();
    Worker.postMessage({
      url: skynetAPI,
      options: {
        params: data,
        timeout: 10000
      }
    });
  }
}

function appendGameData (key, data) {
  try {
    const splitData = data ? data.split('_') : [];
    return {
      // trackingId: data,
      gameTrackingCategory: splitData[0] || '',
      gameTrackingId: splitData[1]
        ? splitData.slice(1, splitData.length - 1).join('_')
        : '',
      gameTrackingProvider: splitData[splitData.length - 1] || ''
    };
  } catch (err) {
    return {
      [key]: data
    };
  }
}

function limitChars (eventName, key, value) {
  if (value && !(eventName.toLowerCase().indexOf('error') > -1)) {
    return value ? value.toString().substr(0, maxChar) : '';
  }
  return value || '';
}
