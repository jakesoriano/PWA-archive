import { updateStore, store } from '_unistore';
import {
	xhr,
	urlCommunity,
	urlUser
} from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function filterCommunity(name, page, limit) {
  // curreny state
  const { communities } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

  // initial state
  updateStore({
    communities: {
      ...communities,
      fetching: true,
      result: false
    }
  });
  
  return new Promise((resolve) => {
    xhr(urlCommunity + '/search', {
      params: {
        q: name || '', // query string
        p: page || 1, // page number
        s: limit || 20 // limit
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          data: page ? [
            ...communities.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false,
          result: false
        }
      });
      resolve(false);
    });
  });
}

export function fetchCommunities(page, limit) {
  // curreny state
  const { communities } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

  // initial state
  updateStore({
    communities: {
      ...communities,
      fetching: true,
      result: false
    }
  });

	return new Promise((resolve) => {
		xhr(urlCommunity, {
      params: {
        p: page || 1, // page number
        s: limit || 20 // limit
      }
    })
		.then((res) => {
      updateStore({
        communities: {
          data: page ? [
            ...communities.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
			resolve(true);
		})
		.catch((err) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false,
          result: false
        }
      });
			resolve(false);
		});
	});
}

export function followCommunity (item) {
  // curreny state
  let { communities } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }
  
  // initial state
  communities = {
    ...communities,
    data: communities.data.map(i => {
      if(i.id === item.id) {
        i.followed = true;
        i.followers = i.followers + 1;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ communities });

  return new Promise((resolve) => {
    xhr(`${urlUser}/follow`, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'C' 
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false
        }
      });
      console.log(`SPA >> followCommunity Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communities: {
          ...communities,
          data: communities.data.map(i => {
            if(i.id === item.id) {
              i.followed = false;
              i.followers = i.followers - 1;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> followCommunity Error`, err);
      resolve(false);
    });
  });
}

export function unFollowCommunity (item) {
  // curreny state
  let { communities } = store.getState();
  const { authUser } = store.getState();

  // fetching
  if(communities.fetching) {
    return;
  }

  // initial state
  communities = {
    ...communities,
    data: communities.data.map(i => {
      if(i.id === item.id) {
        i.followed = false;
        i.followers = i.followers - 1;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ communities });

  return new Promise((resolve) => {
    xhr(`${urlUser}/follow`, {
      method: 'DELETE',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'C' 
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          ...communities,
          fetching: false
        }
      });
      console.log(`SPA >> unFollowCommunity Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communities: {
          ...communities,
          data: communities.data.map(i => {
            if(i.id === item.id) {
              i.followed = true;
              i.followers = i.followers + 1;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> unFollowCommunity Error`, err);
      resolve(false);
    });
  });
}