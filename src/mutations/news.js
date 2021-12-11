import { store, updateStore } from '_unistore';
import { xhr, urlNews } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchNews () {
  const { news } = store.getState();

  // fetching
  if(news.fetching) {
    return;
  }

  // initial state
  updateStore({
    news: {
      ...news,
      fetching: true,
      result: false
    }
  });

  return xhr(urlNews)
    .then((res) => {
      updateStore({
        news: {
          data: res,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        news: {
          ...news,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
