import { store, updateStore } from '_unistore';
import { xhr, urlDashboard } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchDashboard () {
  // curreny state
  const { dashboard } = store.getState();

  // initial state
  updateStore({
    dashboard: {
      ...dashboard,
      fetching: true,
      result: false
    }
  });

  return xhr(urlDashboard)
    .then((res) => {
      updateStore({
        dashboard: {
          data: res,
          fetching: false,
          result: true
        }
      });
    })
    .catch(() => {
      updateStore({
        dashboard: {
          ...dashboard,
          fetching: false,
          result: false
        }
      });
    });
}
