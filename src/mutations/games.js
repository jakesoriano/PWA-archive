import { store, updateStore } from '_unistore';
import { xhr, urlGames } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchGames () {
  // curreny state
  const { games } = store.getState();

  // initial state
  updateStore({
    games: {
      ...games,
      fetching: true,
      result: false
    }
  });

  return xhr(urlGames)
    .then((res) => {
      updateStore({
        games: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        games: {
          ...games,
          fetching: false,
          result: false
        }
      });
    });
}
