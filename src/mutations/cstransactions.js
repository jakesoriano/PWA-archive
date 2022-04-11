import { store, updateStore } from '_unistore';
import { xhr, urlTransactions } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchCSTransactions(page, limit) {
  // curreny state
  const { cstransactions } = store.getState();

  // fetching
  if (cstransactions.fetching) {
    return;
  }

  // initial state
  updateStore({
    cstransactions: {
      ...cstransactions,
      fetching: true,
      result: false,
    },
  });

  return new Promise((resolve) => {
    xhr(urlTransactions, {
      method: 'GET',
      params: {
        p: page || 1,
        s: limit || 10,
        sort: 'desc',
        type: 'crowdsourcing',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.success && res.data) {
          updateStore({
            cstransactions: {
              ...cstransactions,
              data:
								page && page > 1
								  ? [...cstransactions.data, ...res.data.results]
								  : res.data.results,
              page: page || 1,
              total: res.data.total,
              fetching: false,
              result: true,
            },
          });
          console.log(`SPA >> fetchCSTransactions Success`, res.success);
          resolve(true);
        }
      })
      .catch((err) => {
        updateStore({
          cstransactions: {
            ...cstransactions,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchCSTransactions error`, err);
        resolve(false);
      });
  });
}
