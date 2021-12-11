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
