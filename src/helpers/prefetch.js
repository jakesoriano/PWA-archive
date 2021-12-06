import {
  fetchGrids,
  fetchNews,
  fetchEvents,
  fetchMembers,
  fetchInvited
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    hasUser && fetchNews(),
    hasUser && fetchEvents(),
    hasUser && fetchMembers(),
    hasUser && fetchInvited()
  ]);
}
