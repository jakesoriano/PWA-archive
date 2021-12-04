import { store, updateStore } from '_unistore';
import { xhr, urlTranslation } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchTranslation () {
  // curreny state
  const { translation } = store.getState();
  // initial state
  updateStore({
    translation: {
      ...translation,
      fetching: true,
      result: false
    }
  });

  return xhr(urlTranslation)
    .then((res) => {
      updateStore({
        translation: {
          data: res,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        translation: {
          ...translation,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
