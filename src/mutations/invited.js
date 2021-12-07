import { store, updateStore } from '_unistore';
import { xhr, urlInvited } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchInvited () {
  // curreny state
  const { invited } = store.getState();
  // initial state
  updateStore({
    invited: {
      ...invited,
      fetching: true,
      result: false
    }
  });

  return xhr(urlInvited)
    .then((res) => {
      updateStore({
        invited: {
          data: res,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        invited: {
          ...invited,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
