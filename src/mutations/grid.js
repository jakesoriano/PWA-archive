import { store, updateStore } from '_unistore';
import { xhr, urlGrid } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchGrids () {
  // curreny state
  const { grid } = store.getState();

  // initial state
  updateStore({
    grid: {
      ...grid,
      fetching: true,
      result: false
    }
  });

  return xhr(urlGrid)
    .then((res) => {
      updateStore({
        grid: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        grid: {
          ...grid,
          fetching: false,
          result: false
        }
      });
    });
}
