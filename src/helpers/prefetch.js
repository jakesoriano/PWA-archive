import {
  fetchGrids,
  // fetchUserPoints,
  fetchNews,
  fetchEvents,
  fetchMembers,
  fetchInvited,
  fetchStories,
  fetchCommunities,
  generateNotifications,
  fetchTasks
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    // hasUser && fetchUserPoints(),
    hasUser && fetchNews(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited(),
    hasUser && fetchStories(),
    hasUser && fetchCommunities(),
    hasUser && fetchTasks(),
  ]).then(() => {
    hasUser && generateNotifications();
  });
}
