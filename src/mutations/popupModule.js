import { store, updateStore } from '_unistore';
import { xhr, urlPopupModule } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchPopupModule () {
  // curreny state
  const { popupModule } = store.getState();

  // initial state
  updateStore({
    popupModule: {
      ...popupModule,
      fetching: true,
      result: false
    }
  });

  return xhr(urlPopupModule)
    .then((res) => {
      updateStore({
        popupModule: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        popupModule: {
          ...popupModule,
          fetching: false,
          result: false
        }
      });
    });
}
