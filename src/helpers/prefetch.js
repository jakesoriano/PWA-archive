import {
  fetchGrids,
  // fetchUserPoints,
  // fetchNews,
  fetchEvents,
  fetchMembers,
  fetchInvited,
  fetchStories,
  fetchCommunities,
  getCommunityInfo,
  generateNotifications,
  fetchTasks,
  fetchLeaderboard
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    // hasUser && fetchUserPoints(),
    // hasUser && fetchNews(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited(),
    hasUser && fetchStories(),
    hasUser && fetchCommunities(),
    hasUser && getCommunityInfo(),
    hasUser && fetchTasks(),
    hasUser && fetchLeaderboard(),
  ]).then(() => {
    hasUser && generateNotifications();
  });
}
