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
    data: data
  });
}
