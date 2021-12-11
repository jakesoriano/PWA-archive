import { store, updateStore } from '_unistore';
import { xhr, urlEvents, urlShare, urlTag } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchEvents () {
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
    xhr(urlEvents, {
      method: 'GET',
    })
    .then((res) => {
      updateStore({
        events: {
          data: res.data,
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

export function shareEvent (item) {
  const { events } = store.getState();
  const { authUser } = store.getState();
  // initial state
  updateStore({
    events: {
      ...events,
      data: events.data.map(i => {
        if(i.id === item.id) {
          i.shared = true;
        }
        return i;
      }),
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlShare, {
      method: 'POST',
      data: {
        userId: authUser.profile._id,
        itemId: item.id,
        itemType: 'E'
      }
    })
    .then((res) => {
      updateStore({
        events: {
          ...events,
          data: events.data.map(i => {
            if(i.id === item.id) {
              i.shared = true;
            }
            return i;
          }),
          fetching: false,
          result: true
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
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> shareEvents Error`, err);
      resolve(false);
    });
  });
}

export function selectTag (tag, item) {
  const { events } = store.getState();
  const { authUser } = store.getState();
  const defaultTag = item.tagged
  // initial state
  updateStore({
    events: {
      ...events,
      data: events.data.map(i => {
        if(i.id === item.id) {
          i.tagged = tag;
        }
        return i;
      }),
      fetching: true,
      result: false
    }
  });

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
          data: events.data.map(i => {
            if(i.id === item.id) {
              i.tagged = tag;
            }
            return i;
          }),
          fetching: false,
          result: true
        }
      });
      console.log('eventstate', events);
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
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> selectTag Error`, err);
      resolve(false);
    });
  });
}