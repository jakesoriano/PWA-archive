import { store, updateStore } from '_unistore';
import { xhr, urlMembers } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchMembers(page, limit) {
  // curreny state
  const { members } = store.getState();

  // fetching
  if (members.fetching) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // initial state
  updateStore({
    members: {
      ...members,
      fetching: true,
      result: false,
    },
  });

  return xhr(urlMembers, {
    method: 'GET',
    params: {
      p: page || 1, // page number
      s: limit || 10, // limit
    },
  })
    .then((res) => {
      updateStore({
        members: {
          data:
						page && page > 1
						  ? [...members.data, ...res.data.results]
						  : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true,
        },
      });
      return true;
    })
    .catch(() => {
      updateStore({
        members: {
          ...members,
          fetching: false,
          result: false,
        },
      });
      return false;
    });
}
