import {
  fetchGrids
} from '_mutations';

// eslint-disable-next-line import/prefer-default-export
export function prefetch () {
  return Promise.all([
    fetchGrids()
  ]);
}
