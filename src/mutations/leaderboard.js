import { store, updateStore } from '_unistore';
import { xhr, urlLeaderboard, urlLeaderboardFilters } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchTopRanking (data) {
  // curreny state
  const { topOverall, topPerformers } = store.getState();
  let selectedObj = data.isFromFilter ? topPerformers : topOverall;
  let selectedKey = data.isFromFilter ? 'topPerformers' : 'topOverall';

  // fetching
  if(selectedObj.fetching) {
    return;
  }

  // initial state
  updateStore({
    [selectedKey]: {
      ...selectedObj,
      fetching: true,
      result: false
    }
  });

  return xhr(`${urlLeaderboard}?type=${data.type}&top=${data.top}${data.type === 'regional' && data.region ? '&region=' + data.region : ''}`)
    .then((res) => {
      updateStore({
        [selectedKey]: {
          data: data.isFromFilter ? res.data : res.data[0],
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchTopRanking Success`, res.success);
      return true;
    })
    .catch((err) => {
      updateStore({
        [selectedKey]: {
          ...selectedObj,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchTopRanking failed`, err);
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
