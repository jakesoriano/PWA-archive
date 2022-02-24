import { store, updateStore } from '_unistore';
import { xhr, urlNews, urlLike, urlShare } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchNews (page, limit) {
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
    xhr(urlNews + '/feed/followed', {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      updateStore({
        news: {
          data: page && page > 1 ? [
            ...news.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
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

export function likeShareNews (item, action, parentId, parentType) {
  let { news } = store.getState();
  const { authUser } = store.getState();
  const _url = action === 'liked' ? urlLike : urlShare
  
  // fetching
  if(news.fetching) {
    return;
  }
  
  // initial state
  news = {
    ...news,
    data: news.data.map(i => {
      if(i.id === item.id) {
        i[action] = true;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ news });

  return new Promise((resolve) => {
    xhr(_url, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'N',
        parentId: parentId || 'X',
        parentType: parentType || 'C'
      }
    })
    .then((res) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              action === 'liked' ? 
                i.likeCount = i.likeCount+1 : 
                i.shareCount = i.shareCount+1;
            }
            return i;
          }),
          fetching: false
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
          fetching: false
        }
      });
      console.log(`SPA >> likeNews Error`, err);
      resolve(false);
    });
  });
}

export function removeLikeNews (item, parentId, parentType) {
  let { news } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if(news.fetching) {
    return;
  }

  // initial state
  news = {
    ...news,
    data: news.data.map(i => {
      if(i.id === item.id) {
        i.liked = false;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ news });

  return new Promise((resolve) => {
    xhr(urlLike, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'N',
        parentId: parentId || 'X',
        parentType: parentType || 'C'
      }
    })
    .then((res) => {
      updateStore({
        news: {
          ...news,
          data: news.data.map(i => {
            if(i.id === item.id) {
              i.likeCount = i.likeCount - 1;
            }
            return i;
          }),
          fetching: false
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
          fetching: false
        }
      });
      console.log(`SPA >> removeLikeNews Error`, err);
      resolve(false);
    });
  });
}

export function fetchNewsByCommunity (communityId, page, limit) {
  const { cnews } = store.getState();
  
  // fetching
  if(cnews.fetching) {
    return;
  }

  // initial state
  updateStore({
    cnews: {
      ...cnews,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlNews + `/${communityId}`, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
    .then((res) => {
      const { communityDetails } = store.getState();
      updateStore({
        cnews: {
          data: page && page > 1 ? [
            ...cnews.data,
            ...res.data
          ] : res.data,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchNewsByCommunity Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        cnews: {
          ...cnews,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchNewsByCommunity Error`, err);
      resolve(false);
    });
  });
}