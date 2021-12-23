import {
  fetchGrids,
  fetchUserPoints,
  fetchNews,
  fetchEvents,
  fetchMembers,
  fetchInvited,
  fetchStories,
  fetchCommunities,
  generateNotifications
} from '_mutations';
import { dateWithinDays }from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    hasUser && fetchUserPoints(),
    hasUser && fetchNews(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited(),
    hasUser && fetchStories(),
    hasUser && fetchCommunities(),
  ]).then(() => {
    let lastDateNotified = localStorage.getItem('lastDateNotified');
    if (hasUser && (!lastDateNotified || dateWithinDays(lastDateNotified, -1))) {
      generateNotifications();
    }
  });
}
