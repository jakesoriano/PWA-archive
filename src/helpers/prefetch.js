import {
  fetchGrids,
  fetchAppHomeConfig,
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
  fetchLeaderboardPoints,
  fetchLeaderboardTask,
  fetchLeaderboardH2H,
  fetchVideos,
  fetchMessages,
  fetchCommunityVolunteers,
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch(hasUser) {
  return Promise.all([
    fetchGrids(),
    fetchAppHomeConfig(),
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
    hasUser && fetchLeaderboardPoints(),
    hasUser && fetchLeaderboardTask(),
    hasUser && fetchLeaderboardH2H(),
    hasUser && fetchVideos(),
    hasUser && fetchMessages(),
    hasUser && fetchCommunityVolunteers(),
  ]).then(() => {
    if (hasUser) {
      generateNotifications();
    }
    return true;
  });
}
