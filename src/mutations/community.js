import { updateStore, store } from '_unistore';
import {
	xhr,
	urlCommunity,
	urlUser,
  urlNews,
  urlCommunitySetup, 
  urlCommunityGetInfo,
  urlCommunityLeader
} from '_helpers';
import { communitySort } from '_constant';

function getSortParams (sort) {
  if (sort) {
    return communitySort.find(i => i.value === sort).params;
  }
  return communitySort.find(i => i.value === 'popularity').params;
}

// eslint-disable-next-line import/prefer-default-export
export function filterCommunity(name, sort, page, limit) {
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
      filter: name || '',
      fetching: true,
      result: false
    }
  });
  
  return new Promise((resolve) => {
    xhr(urlCommunity + '/search', {
      params: {
        // sort
        ...getSortParams(sort),
        q: name || '', // query string
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          ...communities,
          data: page && page > 1 ? [
            ...communities.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          filter: name || '',
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

export function fetchCommunities(sort, page, limit) {
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
      filter: '',
      fetching: true,
      result: false
    }
  });

	return new Promise((resolve) => {
		xhr(urlCommunity, {
      params: {
        // sort
        ...getSortParams(),
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
		.then((res) => {
      updateStore({
        communities: {
          ...communities,
          data: page && page > 1 ? [
            ...communities.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          featured: !sort ? res.data.results[0] : communities.featured,
          page: page || 1,
          filter: '',
          sort: '',
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
  let { communities, communityDetails } = store.getState();
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
      if (communityDetails.hasOwnProperty('details')) {
        updateStore({
          communityDetails: {
            ...communityDetails,
            details: {
              ...communityDetails.details,
              followed: true
            }
          }
        })
      }
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
  let { communities, communityDetails } = store.getState();
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
      if (communityDetails.hasOwnProperty('details')) {
        updateStore({
          communityDetails: {
            ...communityDetails,
            details: {
              ...communityDetails.details,
              followed: false
            }
          }
        })
      }
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

export function setupCommunityInfo (data) {
  // current state
  const url = `${urlCommunitySetup}`;
  
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> setupCommunity Error`, res);
          resolve(res.error);
        } else {
          console.log(`SPA >> setupCommunity successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> setupCommunity failed`, err);
      });
  });
}

export function createCommunityEvent (data) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/events`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data: data.data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> createCommunityEvent Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> createCommunityEvent successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> createCommunityEvent failed`, err);
      });
  });
}

export function createCommunityNews (data) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/news`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data: data.data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> createCommunityNews Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> createCommunityNews successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> createCommunityNews failed`, err);
      });
  });
}

export function getCommunityInfo () {
 // curreny state
 const { communityInfo } = store.getState();

 // fetching
 if(communityInfo.fetching) {
   return;
 }

 // initial state
 updateStore({
   communityInfo: {
     ...communityInfo,
     fetching: true,
     result: false
   }
 });
 
 return new Promise((resolve) => {
   xhr(urlCommunityGetInfo, {
   }).then((res) => {
     if(res.success) {
      updateStore({
        communityInfo: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      resolve(true);
     } else {
      updateStore({
        communityInfo: {
          data: null,
          fetching: false,
          result: false
        }
      });
      resolve(false);
     }
   })
   .catch((err) => {
     updateStore({
       communityInfo: {
         ...communityInfo,
         data: null,
         fetching: false,
         result: false
       }
     });
     resolve(false);
   });
 });
}
