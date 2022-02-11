import { store, updateStore } from '_unistore';
import { xhr, urlLeaderboard, getConfigByKey } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchLeaderboard (type, region, top) {
  // curreny state
  const { topOverall, topPerformers } = store.getState();

  // fetching
  if(topPerformers.fetching) {
    return;
  }

  // initial state
  updateStore({
    topPerformers: {
      ...topPerformers,
      fetching: true,
      result: false
    }
  });

  return xhr(`${urlLeaderboard}?type=${type || 'global'}&top=${top || getConfigByKey('leaderboardTop')}${type === 'regional' && region ? '&region=' + region : ''}`)
    .then((res) => {
      updateStore({
        topPerformers: {
          data: res.data,
          fetching: false,
          result: true,
          filter: {
            type: type || 'global',
            region: region || ''
          }
        },
        topOverall: {
          ...topOverall,
          data: (!type ? res.data[0] : topOverall.data) // get top 1 from overall
        }
      });
      console.log(`SPA >> fetchTopRanking Success`, res.success);
      return true;
    })
    .catch((err) => {
      updateStore({
        topPerformers: {
          ...topPerformers,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchTopRanking failed`, err);
      return false;
    });
}
