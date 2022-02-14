import { store, updateStore } from '_unistore';
import {
  xhr,
  urlAppConfig,
  messageModal,
  getTranslation,
  getConfigByKey,
  setCookieWithExpiration,
  getCookie,
  replaceUrlPlaceholders
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

  return xhr(replaceUrlPlaceholders(urlAppConfig), {
    headers: {
      Accept: '*'
    }
  })
    .then((res) => {
    
      try {
        // check if has new pwa version
        const currentBuild = parseInt(process.env.BUILD_NO.replace(/\./gim, ''));
        const expectedBuild = parseInt(res.web.replace(/\./gim, ''));
        const cookieReload = parseInt(getCookie('reload') || '0');
        if (currentBuild < expectedBuild && cookieReload < res.maxReload) {
          setCookieWithExpiration('reload', cookieReload + 1, new Date().setHours('23', '59', '59'));
          window.location.reload();
        }

        // Get Native Version
        nativeGetVersion((nativeVersion) => {
          // parse versions
          const native  = parseInt(nativeVersion.replace(/\./gim, ''));
          const android  = parseInt(res.android.replace(/\./gim, ''));
          const ios = parseInt(res.ios.replace(/\./gim, ''));
          let hasUpdate = false;
          
          // check if has new andoird version
          if (process.env.PLATFORM !== 'ios' && native < android) {
            hasUpdate = true;
          }
    
          // check if has new ios version
          if (process.env.PLATFORM === 'ios' && native < ios) {
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
                window.open(process.env.PLATFORM === 'ios' ? getConfigByKey('appStore') : getConfigByKey('playStore'), '_blank')
              }
            });
          }
        });
      } catch(err){}

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
