import { updateStore, store } from '_unistore';
import { xhr, urlCrowdsourcing } from '_helpers';

export function getCommunityCrowdsourcing(page, limit) {
  //
  const { crowdsourcing } = store.getState();

  // fetching
  if (crowdsourcing.fetching) {
    return;
  }

  // initial state
  updateStore({
    crowdsourcing: {
      ...crowdsourcing,
      fetching: true,
      result: false,
    },
  });
  const url = `${urlCrowdsourcing}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9, // limit
      },
    })
      .then((res) => {
        console.log({ res });
        updateStore({
          crowdsourcing: {
            data:
							page && page > 1
							  ? [...crowdsourcing.data, ...res.data.results]
							  : res.data.results,
            page: page || 1,
            total: res.data.total,
            fetching: false,
            result: true,
          },
        });
        console.log(`SPA >> fetchcrowdsourcing Success`, res, crowdsourcing);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          crowdsourcing: {
            ...crowdsourcing,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchcrowdsourcing Error`, err);
        resolve(false);
      });
  });
}
