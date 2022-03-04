import { store, updateStore } from '_unistore';
import { xhr, urlLeniPedia, urlLike, urlShare } from '_helpers';

export function fetchLenipedia (page, limit) {
  const { lpannouncements } = store.getState();
  
  // fetching
  if (lpannouncements.fetching) {
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
        console.log(`SPA >> fetchLenipedia Success`, res.success);
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
        console.log(`SPA >> fetchLenipedia Error`, err);
        resolve(false);
      });
  });
}
export function filterLenipedia (filter, page, limit) {
  const { lpannouncements } = store.getState();
  
  // fetching
  if (lpannouncements.fetching) {
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
        console.log(`SPA >> filterLenipedia Success`, res.success);
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
        console.log(`SPA >> filterLenipedia Error`, err);
        resolve(false);
      });
  });
}
export function likeShareLenipedia (item, action, parentId, parentType) {
  let { lpannouncements } = store.getState();
  const { authUser } = store.getState();
  const _url = action === 'liked' ? urlLike : urlShare
  
  // fetching
  if (lpannouncements.fetching) {
    return;
  }
  
  // initial state
  lpannouncements = {
    ...lpannouncements,
    data: lpannouncements.data.map(i => {
      if (i.id === item.id) {
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
              if (i.id === item.id) {
                action === 'liked' ? 
                  i.likeCount +=1 : 
                  i.shareCount +=1;
              }
              return i;
            }),
            fetching: false
          }
        });
        console.log(`SPA >> likeShareLenipedia Success`, res);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          lpannouncements: {
            ...lpannouncements,
            data: lpannouncements.data.map(i => {
              if (i.id === item.id) {
                i[action] = false;
              }
              return i;
            }),
            fetching: false
          }
        });
        console.log(`SPA >> likeShareLenipedia Error`, err);
        resolve(false);
      });
  });
}

export function removeLikeLenipedia (item, parentId, parentType) {
  let { lpannouncements } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if (lpannouncements.fetching) {
    return;
  }

  // initial state
  lpannouncements = {
    ...lpannouncements,
    data: lpannouncements.data.map(i => {
      if (i.id === item.id) {
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
              if (i.id === item.id) {
                i.likeCount -= 1;
              }
              return i;
            }),
            fetching: false
          }
        });
        console.log(`SPA >> removeLikeLenipedia Success`, res);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          lpannouncements: {
            ...lpannouncements,
            data: lpannouncements.data.map(i => {
              if (i.id === item.id) {
                i.liked = true;
              }
              return i;
            }),
            fetching: false
          }
        });
        console.log(`SPA >> removeLikeLenipedia Error`, err);
        resolve(false);
      });
  });
}
