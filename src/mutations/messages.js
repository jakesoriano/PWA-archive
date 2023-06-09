import { store, updateStore } from '_unistore';
import { xhr, urlMessages, urlCommunityLeader } from '_helpers';
// eslint-disable-next-line import/prefer-default-export
export function fetchMessages (page, limit) {
  // curreny state
  const { messages } = store.getState();
  
  // initial state
  updateStore({
    messages: {
      ...messages,
      fetching: true,
      result: false
    }
  });
  
  return xhr(urlMessages, {
    params: {
      p: page || 1,
      s: limit || 10
    }
  })
    .then((res) => {
      updateStore({
        messages: {
          data: res.data.results,
          fetching: false,
          result: true
        }
      });
      return true;
    })
    .catch(() => {
      updateStore({
        messages: {
          ...messages,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}
export function fetchMessagesFeed (feedId, i) {
  // curreny state
  const { mChat } = store.getState();
  
  // initial state
  updateStore({
    mChat: {
      ...mChat,
      fetching: true,
      result: false
    }
  });
  
  return new Promise((resolve) => {
    xhr(`${urlMessages}/${feedId}`, {
      params: {
        i: i || ''
      }
    })
      .then((res) => {
        updateStore({
          mChat: {
            data: i ? {
              ...mChat.data,
              lastIndex: res.data?.lastIndex,
              messages: res.data?.messages.concat(mChat.data?.messages)
            } : res.data,
            fetching: false,
            result: true
          }
        });
        console.log(`SPA >> fetchMessagesFeed successful`, res);
        resolve(true);
      })
      .catch(() => {
        updateStore({
          mChat: {
            ...mChat,
            fetching: false,
            result: false
          }
        });
        resolve(false);
      });
  });
}
export function sendMessage (data, feedId) {
  return new Promise((resolve) => {
    xhr(`${urlMessages}/${feedId ? feedId + '/send' : ''}`, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res) {
          console.log(`SPA >> sendMessage successful`, res);
          resolve(res)
        }
        resolve(null);
      }).catch((err) => {
        console.log(`SPA >> sendMessage failed`, err);
        resolve(null);
      });
  });
}
export function fetchLatestMessage (feedId) {
  const { mChat } = store.getState();

  // initial state
  updateStore({
    mChat: {
      ...mChat,
      fetching: true,
      result: false
    }
  });
  return new Promise((resolve) => {
    xhr(`${urlMessages}/${feedId}/poll`)
      .then((res) => {
        if (res) {
          console.log(`SPA >> fetchLatestMessage successful`, res);
          resolve(res);
        }
        resolve(null);
      }).catch((err) => {
        console.log(`SPA >> fetchLatestMessage failed`, err);
        resolve(null);
      });
  });
}
export function fetchVolunteerStatus (feedId, userId) {
  return new Promise((resolve) => {
    xhr(`${urlMessages}/${feedId}/volunteer/${userId}`)
      .then((res) => {
        if (res) {
          console.log(`SPA >> fetchVolunteerStatus successful`, res);
          resolve(res);
        }
        resolve(null);
      }).catch((err) => {
        console.log(`SPA >> fetchVolunteerStatus failed`, err);
        resolve(null);
      });
  });
}
export function markAsVolunteer (communityId, listingId, userId) {
  return new Promise((resolve) => {
    xhr(`${urlCommunityLeader}/${communityId}/listings/${listingId}/volunteer`, {
      method: 'POST',
      data: {
        userId: userId
      }
    })
      .then((res) => {
        if (res) {
          console.log(`SPA >> markAsVolunteer successful`, res);
          resolve(res)
        }
        resolve(null);
      }).catch((err) => {
        console.log(`SPA >> markAsVolunteer failed`, err);
        resolve(null);
      });
  });
}
export function optOutAsVolunteer (feedId, userId) {
  return new Promise((resolve) => {
    xhr(`${urlMessages}/${feedId}/volunteer/${userId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res) {
          console.log(`SPA >> optOutAsVolunteer successful`, res);
          resolve(res)
        }
        resolve(null);
      }).catch((err) => {
        console.log(`SPA >> optOutAsVolunteer failed`, err);
        resolve(null);
      });
  });
}
