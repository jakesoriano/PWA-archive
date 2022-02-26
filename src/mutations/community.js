import { updateStore, store } from '_unistore';
import {
	xhr,
	urlCommunity,
	urlUser,
  urlNews,
  urlShare,
  urlCommunitySetup, 
  urlCommunityGetInfo,
  urlCommunityLeader,
  urlCommunityVolunteer
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
          featured: !communities.featured ? res.data.results[0] : communities.featured,
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

export function shareEventByLeader (item) {
  let { leaderCommunityEvents } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if(leaderCommunityEvents.fetching) {
    return;
  }

  // initial state
  leaderCommunityEvents = {
    ...leaderCommunityEvents,
    data: leaderCommunityEvents.data.map(i => {
      if(i.id === item.id) {
        i.shared = true;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ leaderCommunityEvents });

  return new Promise((resolve) => {
    xhr(urlShare, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'E',
        parentId: item.communityId,
        parentType: 'C'
      }
    })
    .then((res) => {
      updateStore({
        leaderCommunityEvents: {
          ...leaderCommunityEvents,
          fetching: false
        }
      });
      console.log(`SPA >> shareEvents Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        leaderCommunityEvents: {
          ...leaderCommunityEvents,
          data: leaderCommunityEvents.data.map(i => {
            if(i.id === item.id) {
              i.shared = false;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> shareEvents Error`, err);
      resolve(false);
    });
  });
}

export function shareNewsByLeader (item) {
  let { leaderCommunityAnnouncements } = store.getState();
  const { authUser } = store.getState();
  
  // fetching
  if(leaderCommunityAnnouncements.fetching) {
    return;
  }

  // initial state
  leaderCommunityAnnouncements = {
    ...leaderCommunityAnnouncements,
    data: leaderCommunityAnnouncements.data.map(i => {
      if(i.id === item.id) {
        i.shared = true;
      }
      return i;
    }),
    fetching: true
  };
  updateStore({ leaderCommunityAnnouncements });

  return new Promise((resolve) => {
    xhr(urlShare, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'A',
        parentId: item.communityId,
        parentType: 'C'
      }
    })
    .then((res) => {
      updateStore({
        leaderCommunityAnnouncements: {
          ...leaderCommunityAnnouncements,
          fetching: false
        }
      });
      console.log(`SPA >> shareNewsByLeader Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        leaderCommunityAnnouncements: {
          ...leaderCommunityAnnouncements,
          data: leaderCommunityAnnouncements.data.map(i => {
            if(i.id === item.id) {
              i.shared = false;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> shareNewsByLeader Error`, err);
      resolve(false);
    });
  });
}

export function updateCommunityEvent (data, id) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/events/${id}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'PUT',
      data: data.data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> updateCommunityEvent Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> updateCommunityEvent successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> updateCommunityEvent failed`, err);
      });
  });
}

export function updateCommunityNews (data, id) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/news/${id}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'PUT',
      data: data.data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> updateCommunityNews Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> updateCommunityNews successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> updateCommunityNews failed`, err);
      });
  });
}

export function deleteCommunityEvents (id) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/events/${id}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> deleteCommunityEvents Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> deleteCommunityEvents successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> deleteCommunityEvents failed`, err);
      });
  });
}

export function deleteCommunityNews (id) {
  // current state
  const { communityInfo } = store.getState();
  const url = `${urlCommunityLeader}/${communityInfo.data._id}/news/${id}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> deleteCommunityNews Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> deleteCommunityNews successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> deleteCommunityNews failed`, err);
      });
  });
}

export function fetchCommunityVolunteers (page, limit) {
  //
  const { communityVolunteers } = store.getState();
  
  // fetching
  if(communityVolunteers.fetching) {
    return;
  }

  // initial state
  updateStore({
    communityVolunteers: {
      ...communityVolunteers,
      fetching: true,
      result: false
    }
  });
  const url = `${urlCommunityVolunteer}`;
  return new Promise((resolve) => {
    xhr(url, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 9 // limit
      }
    })
    .then((res) => {
      console.log(1234, communityVolunteers.data, res.data.results)
      updateStore({
        communityVolunteers: {
          data: page && page > 1 ? [
            ...communityVolunteers.data,
            ...res.data.results
          ] : res.data.results,
          page: page || 1,
          total: res.data.total,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchCommunityVolunteers Success`, res, communityVolunteers);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communityVolunteers: {
          ...communityVolunteers,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchCommunityVolunteers Error`, err);
      resolve(false);
    });
  });
}