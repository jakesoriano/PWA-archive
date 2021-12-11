import { store, updateStore } from '_unistore';
import { xhr, urlNews, urlLike, urlShare } from '_helpers';

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
      console.log(`SPA >> fetchNews Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        news: {
          ...news,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchNews Error`, err);
      resolve(false);
    });
  });
}

export function likeShareNews (item, itemType, action) {
  const { news } = store.getState();
  const { authUser } = store.getState();
  const _url = action === 'liked' ? urlLike : urlShare
  // initial state
  updateStore({
    news: {
      ...news,
      data: news.data.map(i => {
        if(i.id === item.id) {
          i[action] = true;
        }
        return i;
      }),
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(_url, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType 
      }
    })
    .then((res) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              i[action] = true;
            }
            return i;
          }),
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> likeNews Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              i[action] = false;
            }
            return i;
          }),
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> likeNews Error`, err);
      resolve(false);
    });
  });
}

export function removeLikeNews (item, itemType) {
  const { news } = store.getState();
  const { authUser } = store.getState();
  // initial state
  updateStore({
    news: {
      ...news,
      data: news.data.map(i => {
        if(i.id === item.id) {
          i.liked = false;
        }
        return i;
      }),
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlLike, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType 
      }
    })
    .then((res) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              i.liked = false;
            }
            return i;
          }),
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> removeLikeNews Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              i.liked = true;
            }
            return i;
          }),
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> removeLikeNews Error`, err);
      resolve(false);
    });
  });
}