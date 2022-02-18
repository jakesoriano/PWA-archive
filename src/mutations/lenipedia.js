import { store, updateStore } from '_unistore';
import { xhr, urlLeniPedia, urlLike, urlShare } from '_helpers';

export function fetchArticles (page, limit) {

  const { lpannouncements } = store.getState();
  
  // fetching
  if(lpannouncements.fetching) {
    return;
  }

  // initial state
  updateStore({
    lpannouncements: {
      ...lpannouncements,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlLeniPedia, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
    .then((res) => {
      updateStore({
        lpannouncements: {
          data: page && page > 1 ? [
            ...lpannouncements.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          filter: '',
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchArticles Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchArticles Error`, err);
      resolve(false);
    });
  });
}
export function filterArticles (filter, page, limit) {

  const { lpannouncements } = store.getState();
  
  // fetching
  if(lpannouncements.fetching) {
    return;
  }

  // initial state
  updateStore({
    lpannouncements: {
      ...lpannouncements,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(`${urlLeniPedia}/search`, {
      method: 'GET',
      params: {
        q: filter || '',
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
    .then((res) => {
      updateStore({
        lpannouncements: {
          data: page && page > 1 ? [
            ...lpannouncements.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          filter: lpannouncements.filter,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> filterArticles Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> filterArticles Error`, err);
      resolve(false);
    });
  });
}
export function likeShareArticles (item, action, parentId, parentType) {
  let { lpannouncements } = store.getState();
  const { authUser } = store.getState();
  const _url = action === 'liked' ? urlLike : urlShare
  
  // fetching
  if(lpannouncements.fetching) {
    return;
  }
  
  // initial state
  lpannouncements = {
    ...lpannouncements,
    data: lpannouncements.data.map(i => {
      if(i.id === item.id) {
        i[action] = true;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ lpannouncements });

  return new Promise((resolve) => {
    xhr(_url, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'L',
        parentId: parentId || 'X',
        parentType: parentType || 'X'
      }
    })
    .then((res) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          data: lpannouncements.data.map(i => {
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
      console.log(`SPA >> likeShareArticles Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          data: lpannouncements.data.map(i => {
            if(i.id === item.id) {
              i[action] = false;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> likeShareArticles Error`, err);
      resolve(false);
    });
  });
}

export function removeLikeArticles (item, parentId, parentType) {
  let { lpannouncements } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if(lpannouncements.fetching) {
    return;
  }

  // initial state
  lpannouncements = {
    ...lpannouncements,
    data: lpannouncements.data.map(i => {
      if(i.id === item.id) {
        i.liked = false;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ lpannouncements });

  return new Promise((resolve) => {
    xhr(urlLike, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'L',
        parentId: parentId || 'X',
        parentType: parentType || 'X'
      }
    })
    .then((res) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          data: lpannouncements.data.map(i => {
            if(i.id === item.id) {
              i.likeCount = i.likeCount - 1;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> removeLikeArticles Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        lpannouncements: {
          ...lpannouncements,
          data: lpannouncements.data.map(i => {
            if(i.id === item.id) {
              i.liked = true;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> removeLikeArticles Error`, err);
      resolve(false);
    });
  });
}