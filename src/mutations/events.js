import { store, updateStore } from '_unistore';
import { xhr, urlEvents } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents () {
  // curreny state
  const { events } = store.getState();

  // fetching
  if(events.fetching) {
    return;
  }

  // initial state
  updateStore({
    events: {
      ...events,
      fetching: true,
      result: false
    }
  });

  return xhr(urlEvents)
    .then((res) => {
      updateStore({
        events: {
          data: res,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        events: {
          ...events,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
