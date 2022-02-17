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
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      updateStore({
        communities: {
          data: page && page > 1 ? [
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
        s: limit || 9 // limit
      }
    })
		.then((res) => {
      updateStore({
        communities: {
          data: page && page > 1 ? [
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

export function fetchCommunityEvents(page, limit) {
  
  const { communityInfo, leaderCommunityEvents } = store.getState();
  
  // fetching
  if(leaderCommunityEvents.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderCommunityEvents: {
      ...leaderCommunityEvents,
      fetching: true,
      result: false
    }
  });
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/events`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      updateStore({
        leaderCommunityEvents: {
          data: page && page > 1 ? [
            ...leaderCommunityEvents.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchCommunityEvents Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        leaderCommunityEvents: {
          ...leaderCommunityEvents,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchCommunityEvents Error`, err);
      resolve(false);
    });
  });
}

export function fetchCommunityAnnouncement(page, limit) {
  const { communityInfo, leaderCommunityAnnouncements } = store.getState();
  
  // fetching
  if(leaderCommunityAnnouncements.fetching) {
    return;
  }

  // initial state
  updateStore({
    leaderCommunityAnnouncements: {
      ...leaderCommunityAnnouncements,
      fetching: true,
      result: false
    }
  });
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/news`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      updateStore({
        leaderCommunityAnnouncements: {
          data: page && page > 1 ? [
            ...leaderCommunityAnnouncements.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchCommunityAnnouncements Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        leaderCommunityAnnouncements: {
          ...leaderCommunityAnnouncements,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchCommunityAnnouncements Error`, err);
      resolve(false);
    });
  });
}

export function shareEventByLeader (item, parentId, parentType) {
  let { events, communityDetails } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if(events.fetching || communityDetails.fetching) {
    return;
  }

  // initial state
  events = {
    ...events,
    data: events.data.map(i => {
      if(i.id === item.id) {
        i.shared = true;
      }
      return i;
    }),
    fetching: true
  };
  communityDetails = {
    ...communityDetails,
    events: {
      data: communityDetails.events.data.map(i => {
        if(i.id === item.id) {
          i.shared = true;
        }
        return i;
      }),
    },
    fetching: true
  };
  updateStore({ events, communityDetails });

  return new Promise((resolve) => {
    xhr(urlShare, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'E',
        parentId: parentId || 'X',
        parentType: parentType || 'X'
      }
    })
    .then((res) => {
      updateStore({
        events: {
          ...events,
          fetching: false
        },
        communityDetails: {
          ...communityDetails,
          events: {
            ...communityDetails.events,
          },
          fetching: false
        }
      });
      console.log(`SPA >> shareEvents Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        events: {
          ...events,
          data: events.data.map(i => {
            if(i.id === item.id) {
              i.shared = false;
            }
            return i;
          }),
          fetching: false
        },
        communityDetails: {
          ...communityDetails,
          events: {
            data: communityDetails.events.data.map(i => {
              if(i.id === item.id) {
                i.shared = false;
              }
              return i;
            }),
          },
          fetching: false
        }
      });
      console.log(`SPA >> shareEvents Error`, err);
      resolve(false);
    });
  });
}
