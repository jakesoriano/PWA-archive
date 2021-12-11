import { store, updateStore } from '_unistore';
import { xhr, urlEvents } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents () {
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

  return new Promise((resolve) => {
    xhr(urlEvents, {
      method: 'GET',
    })
    .then((res) => {
      updateStore({
        events: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchEvents Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        events: {
          ...events,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchEvents Error`, err);
      resolve(false);
    });
  });
}
