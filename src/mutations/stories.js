import { store, updateStore } from '_unistore';
import { xhr, urlFetchStories } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchStories () {
  // current state
  const { stories } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if(stories.fetching) {
    return;
  }
  
  // initial state
  updateStore({
    stories: {
      ...stories,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlFetchStories, {
      method: 'GET',
    })
    .then((res) => {
      updateStore({
        stories: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchStories Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        stories: {
          ...stories,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchStories Error`, err);
      resolve(false);
    });
  });
}
