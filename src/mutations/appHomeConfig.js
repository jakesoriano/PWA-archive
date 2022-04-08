import { store, updateStore } from '_unistore';
import { xhr, urlAppHomeConfig, replaceUrlPlaceholders } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchAppHomeConfig() {
  // curreny state
  const { appHomeConfig } = store.getState();

  // check if already fetching
  if (appHomeConfig.fetching) {
    return true;
  }

  // initial state
  updateStore({
    appHomeConfig: {
      ...appHomeConfig,
      fetching: true,
      result: false,
    },
  });

  return xhr(replaceUrlPlaceholders(urlAppHomeConfig))
    .then((res) => {
      // update config
      updateStore({
        appHomeConfig: {
          data: res,
          fetching: false,
          result: true,
        },
      });
      return true;
    })
    .catch(() => {
      updateStore({
        appHomeConfig: {
          ...appHomeConfig,
          fetching: false,
          result: false,
        },
      });
      return false;
    });
}
