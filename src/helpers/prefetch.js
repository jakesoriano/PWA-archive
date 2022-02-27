import {
  fetchGrids,
  // fetchUserPoints,
  fetchNews,
  fetchAnnouncements,
  fetchEvents,
  fetchMembers,
  fetchInvited,
  fetchStories,
  fetchCommunities,
  getCommunityInfo,
  generateNotifications,
  fetchTasks,
  fetchLeaderboard,
  fetchVideos,
  fetchMessages
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    // hasUser && fetchUserPoints(),
    hasUser && fetchNews(),
    hasUser && fetchAnnouncements(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited(),
    hasUser && fetchStories(),
    hasUser && fetchCommunities(),
    hasUser && getCommunityInfo(),
    hasUser && fetchTasks(),
    hasUser && fetchLeaderboard(),
    hasUser && fetchVideos(),
    hasUser && fetchMessages()
  ]).then(() => {
    hasUser && generateNotifications();
  });
}
