import {
  fetchGrids,
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
    hasUser && fetchNews(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited(),
    hasUser && fetchStories(),
    hasUser && fetchCommunities(),
  ]).then(() => {
    hasUser && generateNotifications();
  });
}
