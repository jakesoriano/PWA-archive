import FingerprintJS from '@fingerprintjs/fingerprintjs';

// eslint-disable-next-line import/prefer-default-export
export function nativeWebReady () {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeWebReady();');
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

export function nativeShare (data) {}

export function nativeExitApp () {}

export function nativeSelfie () {
  return new Promise((resolve) => {
    resolve('01FPKR8R3ECPFJ36G9FY8ERHD7.jpeg');
  });
}

export function nativeSetCredential (data) {}

export function nativeToggleTouchID (value) {}

export function nativeLoginWithTouchID () {
  return new Promise((resolve) => {
    resolve(null);
  });
}

export function nativeStatusTouchID () {
  return new Promise((resolve) => {
    resolve(false);
  });
}

export function nativeSigninFacebook () {
  return new Promise((resolve) => {
    // error
    resolve({
      success: false,
      error: {}
    });
    // // success
    // resolve({
    //   success: true,
    //   data: {
    //     id: 12345,
    //     email: 'test@gmail.com',
    //     fname: 'fname',
    //     lname: 'lname',
    //     image: '',
    //     token: '',
    //   }
    // });
  });
}

export function nativeSigninTwitter () {
  return new Promise((resolve) => {
    // error
    resolve({
      success: false,
      error: {}
    });
  });
}

export function nativeSigninGoogle () {
  return new Promise((resolve) => {
    // error
    resolve({
      success: false,
      error: {}
    });
  });
}

export function nativeSigninApple () {
  return new Promise((resolve) => {
    // error
    resolve({
      success: false,
      error: {}
    });
  });
}

export function nativeOnLogout () {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeOnLogout();');
}

export function nativeSetAuthToken (token) {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeSetAuthToken();');
}

export function nativeGetVersion (callback) {
  // eslint-disable-next-line no-console
  console.log('SPA >> nativeGetVersion();');
}
