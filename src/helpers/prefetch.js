import {
  fetchGrids,
  fetchNews,
  fetchEvents
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch (hasUser) {
  return Promise.all([
    fetchGrids(),
    hasUser && fetchNews(),
    hasUser && fetchEvents()
  ]);
}
