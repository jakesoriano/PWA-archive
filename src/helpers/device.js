import { getCookie } from '_helpers';

function getUserAgent () {
  try {
    return window.navigator.userAgent.toLowerCase();
  } catch (err) {
    return '';
  }
}

function getApiPlatform () {
  if (process.env.PLATFORM === 'web') {
    return /ipad|iphone|ipod/.test(getUserAgent()) ? 'web-ios' : 'web-android';
  }
  return process.env.PLATFORM;
}

// eslint-disable-next-line import/prefer-default-export
export const platform = {
  consumer: 'mobile',
  os: /ipad|iphone|ipod/.test(getUserAgent()) ? 'ios' : 'android',
  apiPlatform: getApiPlatform()
};

export const webInfo = {
  // vendor: window.navigator.vendor,
  // appVersion: window.navigator.appVersion,
  userAgent: getUserAgent()
  // platform: window.navigator.platform,
  // productSub: window.navigator.productSub
};
