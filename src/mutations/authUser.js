import { updateStore, store } from '_unistore';
import { xhr, urlUserData, removeCookie, urlUserPoints } from '_helpers';

export function logOut (callback) {
  removeCookie('token');
  updateStore({
    authUser: null
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
        updateStore({
          authUser: {
            ...authUser,
            ...res
          }
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
    xhr(urlUserData, {
      method: 'GET',
      data
    })
      .then((res) => {
        updateStore({
          authUser: res
        });
        // eslint-disable-next-line
				console.log(`SPA >> login successful`, res);
        resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve(false);
      });
  });
}