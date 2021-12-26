import FingerprintJS from '@fingerprintjs/fingerprintjs';

function callNative(data) {
  window.ReactNativeWebView && window.ReactNativeWebView.postMessage(data)
}

// eslint-disable-next-line import/prefer-default-export
export function nativeWebReady () {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeWebReady();');
  callNative({
    action: 'loaded'
  });
}

async function getFingerPrint (callback) {
  try {
    // We recommend to call `load` at application startup.
    const fp = await FingerprintJS.load();

    // The FingerprintJS agent is ready.
    // Get a visitor identifier when you'd like to.
    const result = await fp.get();

    // This is the visitor identifier:
    callback(result.visitorId);
  } catch (err) {
    callback('');
  }
}

export function nativeGetDeviceId (callback) {
  // eslint-disable-next-line
	getFingerPrint(callback);
}

export function nativeShare (data) {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeShare();');
	callNative({
    action: 'share',
    data: {
      ...data,
      message: (data.message || '').replace(/\t/g, '')
    }
  });
}

export function nativeExitApp () {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeExitApp();');
	callNative({
    action: 'exitApp'
  });
}

export function nativeSelfie () {
  return new Promise((resolve) => {
    window.cbSelfie = (image) => {
      resolve(image)
      window.cbSelfie = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeSelfie();');
    callNative({
      action: 'selfie',
      callback: 'window.cbSelfie'
    });
  });
}

export function nativeSetCredential (data) {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeSetCredential();');
  callNative({
    action: 'setCredential',
    data
  });
}

export function nativeToggleTouchID (value) {
  return new Promise((resolve) => {
    window.cb = (success) => {
      resolve(success)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeToggleTouchID();');
    callNative({
      action: 'toogleTouchID',
      callback: 'window.cb',
      value
    });
  });
}

export function nativeLoginWithTouchID () {
  return new Promise((resolve) => {
    window.cb = (res) => {
      resolve(res)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeLoginWithTouchID();');
    callNative({
      action: 'loginWithTouchID',
      callback: 'window.cb',
    });
  });
}

export function nativeStatusTouchID () {
  return new Promise((resolve) => {
    window.cb = (res) => {
      resolve(res)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeStatusTouchID();');
    callNative({
      action: 'statusTouchID',
      callback: 'window.cb',
    });
  });
}

export function nativeSigninFacebook () {
  return new Promise((resolve) => {
    window.cb = (res) => {
      resolve(res)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeSigninFacebook();');
    callNative({
      action: 'signinFacebook',
      callback: 'window.cb',
    });
  });
}

export function nativeSigninTwitter () {
  return new Promise((resolve) => {
    window.cb = (res) => {
      resolve(res)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeSigninTwitter();');
    callNative({
      action: 'signinTwitter',
      callback: 'window.cb',
    });
  });
}

export function nativeSigninGoogle () {
  return new Promise((resolve) => {
    window.cb = (res) => {
      resolve(res)
      window.cb = null;
    }
    // eslint-disable-next-line no-console
    console.log('SPA >> nativeSigninGoogle();');
    callNative({
      action: 'signinGoogle',
      callback: 'window.cb',
    });
  });
}

export function nativeOnLogout () {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeOnLogout();');
  callNative({
    action: 'onLogout'
  });
}
