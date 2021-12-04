import { store, updateStore } from '_unistore';
import { xhr, urlLottery } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchLottery () {
  // curreny state
  const { lottery } = store.getState();

  // initial state
  updateStore({
    lottery: {
      ...lottery,
      fetching: true,
      result: false
    }
  });

  return xhr(urlLottery)
    .then((res) => {
      updateStore({
        lottery: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        lottery: {
          ...lottery,
          fetching: false,
          result: false
        }
      });
    });
}
