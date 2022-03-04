import { store, updateStore } from '_unistore';
import { xhr, urlAppLandingConfig, replaceUrlPlaceholders } from '_helpers';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export function fetchAppLandingConfig () {
  // current state
  const { appLandingConfig } = store.getState();

  // fetching
  if (appLandingConfig.fetching) {
    return true;
  }
  
  // initial state
  updateStore({
    appLandingConfig: {
      ...appLandingConfig,
      fetching: true,
      result: false
    }
  });

  return xhr(urlAppLandingConfig)
    .then((res) => { 
    // update config
      updateStore({
        appLandingConfig: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        appLandingConfig: {
          ...appLandingConfig,
          fetching: false,
          result: false
        }
      });
    });
}
