import { updateStore, store } from '_unistore';
import { xhr, urlHouse2House } from '_helpers';

export function fetchHouse2HouseCalendar(page, filter, limit) {
  let { h2hcalendar } = store.getState();

  if (h2hcalendar.fetching) {
    return false;
  }

  // initial state
  updateStore({
    h2hcalendar: {
      ...h2hcalendar,
      fetching: true,
      result: false,
    },
  });
  return new Promise((resolve) => {
    xhr(urlHouse2House, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9, // limit
        ...filter,
      },
    })
      .then((res) => {
        if (res.success) {
          updateStore({
            h2hcalendar: {
              ...h2hcalendar,
              data:
								page && page > 1
								  ? [...h2hcalendar.data, ...res.data.results]
								  : res.data.results,
              page: page || 1,
              total: res.data.total,
              fetching: false,
              result: true,
            },
          });
        }
        console.log(`SPA >> fetchHouse2HouseCalendar Success`, res);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          h2hcalendar: {
            ...h2hcalendar,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchHouse2HouseCalendar Error`, err);
        resolve(false);
      });
  });
}
