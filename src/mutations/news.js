import { store, updateStore } from '_unistore';
import { xhr, urlNews } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchNews () {
  const { news } = store.getState();
  const { authUser } = store.getState();
  const _urlNews = `${urlNews}/${authUser.profile._id}`;
  // initial state
  updateStore({
    news: {
      ...news,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlNews, {
      method: 'GET',
    })
    .then((res) => {
      updateStore({
        news: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      resolve(true);
    })
    .catch(() => {
      updateStore({
        news: {
          ...news,
          fetching: false,
          result: false
        }
      });
      resolve(false);
    });
  });
}
