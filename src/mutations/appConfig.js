import { store, updateStore } from '_unistore';
import {
  xhr,
  urlAppConfig,
  platform,
  messageModal,
  getTranslation,
  getConfigByKey
} from '_helpers';
import { nativeGetVersion } from '_platform/helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchAppConfig () {
  // curreny state
  const { appConfig } = store.getState();

  // check if already fetching
  if (appConfig.fetching) {
    return true;
  }

  // initial state
  updateStore({
    appConfig: {
      ...appConfig,
      fetching: true,
      result: false
    }
  });

  return xhr(urlAppConfig)
    .then((res) => {

      // Get Native Version
      nativeGetVersion((nativeVersion) => {

        try {
          // parse versions
          const native  = parseInt(nativeVersion.replace(/\./gim, ''));
          const android  = parseInt(res.android.replace(/\./gim, ''));
          const ios  = parseInt(res.ios.replace(/\./gim, ''));
          let hasUpdate = false;
          
          // check if has new andoird version
          if (platform.os !== 'ios' && native < android) {
            hasUpdate = true;
          }
    
          // check if has new ios version
          if (platform.os === 'ios' && native < ios) {
            hasUpdate = true;
          }
  
          // has update
          if (hasUpdate) {
            messageModal({
              title: getTranslation('NEW_UPDATE_TITLE'),
              message: getTranslation('NEW_UPDATE_DESC'),
              disableClose: true,
              btnText: getTranslation('NEW_UPDATE_BTN'),
              cbOk: () => {
                // no action here
                window.open(platform.os === 'ios' ? getConfigByKey('appStore') : getConfigByKey('playStore'), '_blank')
              }
            });
          }
        } catch(err){}
      });

      // update config
      updateStore({
        appConfig: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        appConfig: {
          ...appConfig,
          fetching: false,
          result: false
        }
      });
    });
}
