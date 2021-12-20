import { updateStore, store, initialStore } from '_unistore';
import {
  xhr,
  urlUserLogin,
  removeCookie,
  urlUserPoints,
  urlChangePassword,
  getTranslation
} from '_helpers';

export function logOut (callback) {

  const {
    news,
    events,
    members,
    invited,
    communities,
  } = initialStore;

  removeCookie('token');
  updateStore({
    authUser: null,
    news,
    events,
    members,
    invited,
    communities,
  });
  if (callback) {
    callback();
  }
}

// eslint-disable-next-line import/prefer-default-export
export function fetchUserData (token) {
  return new Promise((resolve) => {
    xhr(urlUserData, {
      token
    })
      .then((res) => {
        updateStore({
          authUser: res
        });
        // eslint-disable-next-line
				console.log(`SPA >> fetchUserData successful`, res);
        resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> fetchUserData Error`, err);
        resolve(false);
      });
  });
}

export function fetchUserPoints () {
  return new Promise((resolve) => {
    xhr(urlUserPoints)
      .then((res) => {
        // get current data
        const { authUser } = store.getState();
        const {
          news,
          events,
          members,
          invited,
          communities
        } = initialStore;
        updateStore({
          authUser: {
            ...authUser,
            ...res
          },
          news,
          events,
          members,
          invited,
          communities,
        });
        // eslint-disable-next-line
				console.log(`SPA >> fetchUserPoints successful`, res);
        resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> fetchUserPoints Error`, err);
        resolve(false);
      });
  });
}

export function login (data) {
  return new Promise((resolve) => {
    xhr(urlUserLogin, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res && res.success) {
          updateStore({
            authUser: {
              ...res,
              points: res.points || 0,
              rank: res.rank || 0,
            }
          });
          // eslint-disable-next-line
          console.log(`SPA >> login successful`, res);
          resolve(true);
        } else {
          updateStore({
            alertShow: {
              success: false,
              content: getTranslation('INVALID_USER_PASS'),
              noTopBar: true
            }
          });
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve(false);
      });
  });
}


export function changePassword (data) {
  return new Promise((resolve) => {
    xhr(urlChangePassword, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res && res.success) {
          // eslint-disable-next-line
          console.log(`SPA >> login successful`, res);
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve(false);
      });
  });
}