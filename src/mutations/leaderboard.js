import { store, updateStore } from '_unistore';
import { xhr, urlTopOverall, urlLeaderboardFilters } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchTopRanking () {
  // curreny state
  const { topOverall } = store.getState();

  // fetching
  if(topOverall.fetching) {
    return;
  }

  // initial state
  updateStore({
    topOverall: {
      ...topOverall,
      fetching: true,
      result: false
    }
  });

  return xhr(urlTopOverall)
    .then((res) => {
      updateStore({
        topOverall: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        topOverall: {
          ...topOverall,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}

export function getLeaderboardFilters () {
  const { filters } = store.getState();

  // initial state
  updateStore({
    filters: {
      ...filters,
      fetching: true,
      result: false
    }
  });

  return xhr(urlLeaderboardFilters)
    .then((res) => {
      updateStore({
        filters: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        filters: {
          ...filters,
          fetching: false,
          result: false
        }
      });
    });
}
