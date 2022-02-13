import { store, updateStore } from '_unistore';
import { xhr, urlLeaderboard, getConfigByKey } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchLeaderboard (type, region, top) {
  // curreny state
  const { leaderboard } = store.getState();

  // fetching
  if(leaderboard.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderboard: {
      ...leaderboard,
      fetching: true,
      result: false
    }
  });

  return xhr(`${urlLeaderboard}?type=${type || 'global'}&top=${top || getConfigByKey('leaderboard', 'top')}${type === 'regional' && region ? '&region=' + region : ''}`)
    .then((res) => {
      updateStore({
        leaderboard: {
          ...leaderboard,
          fetching: false,
          result: true,
          data: res.data.filter(i => i),
          featured: (!type ? res.data[0] : res.featured), // get top 1 from overall
          filter: {
            type: type || 'global',
            region: region || ''
          },
        },
      });
      console.log(`SPA >> fetchTopRanking Success`, res.success);
      return true;
    })
    .catch((err) => {
      updateStore({
        leaderboard: {
          ...leaderboard,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchTopRanking failed`, err);
      return false;
    });
}
