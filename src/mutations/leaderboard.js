import { store, updateStore } from '_unistore';
import {
  xhr,
  urlLeaderboard,
  urlLeaderboardTask,
  urlLeaderboardH2H,
  getConfigByKey,
} from '_helpers';

function getFilterParams(filter) {
  const { authUser } = store.getState();
  return {
    top: filter?.top || getConfigByKey('leaderboard', 'top'),
    period: (filter?.period || 'alltime').toLowerCase(),
    type: (filter?.range || 'global').toLowerCase(),
    ...(filter?.range?.toLowerCase() === 'regional'
      ? {
        region: authUser?.profile?.region || '',
			  }
      : {}),
  };
}

function getAppendUser(type, filter) {
  const { authUser } = store.getState();
  const key = `${filter.type}_${filter.period}`;

  if (type == 'points') {
    const rank = authUser?.rank?.points && authUser?.rank?.points[key];
    if (rank && rank > 10) {
      return {
        profile: authUser.profile,
        members: authUser.members,
        rank,
        points:
					filter.period === 'alltime'
					  ? authUser?.points
					  : authUser[`points_${filter.period}`],
      };
    }
  } else {
    const rank = authUser?.rank?.tasks && authUser?.rank?.tasks[key];
    if (rank && rank > 10) {
      return {
        profile: authUser.profile,
        members: authUser.members,
        rank,
        completedTaskCount:
					filter.period === 'alltime'
					  ? authUser?.completedTaskCount
					  : authUser[`completedTaskCount_${filter.period}`],
      };
    }
  }
  return null;
}

// eslint-disable-next-line import/prefer-default-export
export function fetchLeaderboardPoints(filter) {
  // curreny state
  const { leaderboard } = store.getState();

  // fetching
  if (leaderboard.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderboard: {
      ...leaderboard,
      fetching: true,
      result: false,
    },
  });

  // filter params
  const params = getFilterParams(filter);

  // append user
  const appendUserData = getAppendUser('points', params);

  return xhr(urlLeaderboard, { params })
    .then((res) => {
      console.error(res);
      // append curret user, filter and sort
      const data = (
        appendUserData ? [...res.data, ...[appendUserData]] : res.data
      )
        .filter((i) => i)
        .sort((a, b) => b.points - a.points);
      // update store
      updateStore({
        leaderboard: {
          ...leaderboard,
          fetching: false,
          result: true,
          data,
          featured: !filter?.range ? data[0] : leaderboard.featured, // get top 1 from overall
          filter: params,
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
          result: false,
        },
      });
      console.log(`SPA >> fetchTopRanking failed`, err);
      return false;
    });
}

// eslint-disable-next-line import/prefer-default-export
export function fetchLeaderboardTask(filter) {
  // curreny state
  const { leaderboardTask } = store.getState();

  // fetching
  if (leaderboardTask.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderboardTask: {
      ...leaderboardTask,
      fetching: true,
      result: false,
    },
  });

  // filter params
  const params = getFilterParams(filter);

  // append user
  const appendUserData = getAppendUser('tasks', params);

  return xhr(urlLeaderboardTask, { params })
    .then((res) => {
      // append curret user, filter and sort
      const data = (
        appendUserData ? [...res.data, ...[appendUserData]] : res.data
      )
        .filter((i) => i)
        .sort((a, b) => b.completedTaskCount - a.completedTaskCount);
      // update store
      updateStore({
        leaderboardTask: {
          ...leaderboardTask,
          fetching: false,
          result: true,
          data,
          featured: !filter?.range ? data[0] : leaderboardTask.featured, // get top 1 from overall
          filter: params,
        },
      });
      console.log(`SPA >> fetchLeaderboardTask Success`, res.success);
      return true;
    })
    .catch((err) => {
      updateStore({
        leaderboardTask: {
          ...leaderboardTask,
          fetching: false,
          result: false,
        },
      });
      console.log(`SPA >> fetchLeaderboardTask failed`, err);
      return false;
    });
}

export function fetchLeaderboardH2H() {
  // curreny state
  const { leaderboardH2H } = store.getState();

  // fetching
  if (leaderboardH2H.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderboardH2H: {
      ...leaderboardH2H,
      filter: '',
      fetching: true,
      result: false,
    },
  });

  return new Promise((resolve) => {
    xhr(urlLeaderboardH2H)
      .then((res) => {
        const data = (res.data?.results?.filter((i) => i) || []).sort(
          (a, b) => b.count - a.count
        );
        updateStore({
          leaderboardH2H: {
            ...leaderboardH2H,
            fetching: false,
            result: true,
            data,
            // featured: (!filter?.range ? data[0] : leaderboardH2H.featured), // get top 1 from overall
            // filter: params,
          },
        });
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          leaderboardH2H: {
            ...leaderboardH2H,
            fetching: false,
            result: false,
          },
        });
        resolve(false);
      });
  });
}
