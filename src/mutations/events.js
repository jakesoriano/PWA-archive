import { store, updateStore } from '_unistore';
import { xhr, urlEvents, urlShare, urlTag } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents (page, limit) {
  const { events } = store.getState();
  
  // fetching
  if(events.fetching) {
    return;
  }

  // initial state
  updateStore({
    events: {
      ...events,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlEvents + '/feed/followed', {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
    .then((res) => {
      updateStore({
        events: {
          data: page ? [
            ...events.data,
            ...res.data.results
          ] : res.data.results,
          total: res.data.total,
          page: page || 1,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchEvents Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        events: {
          ...events,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetchEvents Error`, err);
      resolve(false);
    });
  });
}
export function fetchEventsByCommunityId (id, page, limit) {
  const { communityDetailsevents } = store.getState();
  
  // fetching
  if(communityDetailsevents.fetching) {
    return;
  }

  // initial state
  updateStore({
    communityDetailsevents: {
      ...communityDetailsevents,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlEvents + `/${id}`, {
      method: 'GET',
      params: {
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
    .then((res) => {
      if (res && res.success) {
        updateStore({
          communityDetailsevents: {
            ...communityDetailsevents,
            data: page ? [
              ...communityDetailsevents.data,
              ...res.data.results
            ] : res.data.results,
            total: res.data.total,
            page: page || 1,
            fetching: false,
            result: true
          }
        });
      }
      console.log(`SPA >> fetchEventsByCommunityId Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        communityDetailsevents: {
          ...communityDetailsevents,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetchEventsByCommunityId Error`, err);
      resolve(false);
    });
  });
}

export function shareEvent (item, parentId, parentType) {
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

export function selectTag (tag, item) {
  let { events, communityDetailsevents } = store.getState();
  const { authUser } = store.getState();
  const defaultTag = item.tagged;
  
  // fetching
  if(events.fetching || communityDetailsevents.fetching) {
    return;
  }

  // initial state
  events = {
    ...events,
    data: events.data.map(i => {
      if(i.id === item.id) {
        i.tagged = tag;
      }
      return i;
    }),
    fetching: true
  }
  communityDetailsevents = {
    ...communityDetailsevents,
    data: communityDetailsevents.data.map(i => {
      if(i.id === item.id) {
        i.tagged = tag;
      }
      return i;
    }),
    fetching: true
  }
  updateStore({ events, communityDetailsevents });

  return new Promise((resolve) => {
    xhr(urlTag, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'E',
        tag
      }
    })
    .then((res) => {
      updateStore({
        events: {
          ...events,
          fetching: false
        },
        communityDetailsevents: {
          ...communityDetailsevents,
          fetching: false
        }
      });
      console.log(`SPA >> selectTag Success`, res);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        events: {
          ...events,
          data: events.data.map(i => {
            if(i.id === item.id) {
              i.tagged = defaultTag;
            }
            return i;
          }),
          fetching: false
        },
        communityDetailsevents: {
          ...communityDetailsevents,
          data: communityDetailsevents.data.map(i => {
            if(i.id === item.id) {
              i.tagged = defaultTag;
            }
            return i;
          }),
          fetching: false
        }
      });
      console.log(`SPA >> selectTag Error`, err);
      resolve(false);
    });
  });
}