import { store, updateStore } from '_unistore';
import { xhr, urlMembers } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchMembers () {
  // curreny state
  const { members } = store.getState();

  // fetching
  if (members.fetching) {
    return;
  }

  // initial state
  updateStore({
    members: {
      ...members,
      fetching: true,
      result: false
    }
  });

  return xhr(urlMembers)
    .then((res) => {
      updateStore({
        members: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        members: {
          ...members,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
