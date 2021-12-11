import { updateStore, store } from '_unistore';
import { xhr, urlUserLogin, removeCookie, urlUserPoints } from '_helpers';

export function logOut (callback) {

  const {
    news,
    events,
    members,
    invited,
    communities,
  } = store.getState();

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
        const {
          authUser,
          news,
          events,
          members,
          invited,
          communities
        } = store.getState();
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
            authUser: res,
            alertShow: null
          });
          // eslint-disable-next-line
          console.log(`SPA >> login successful`, res);
          resolve(true);
        } else {
          updateStore({
            alertShow: {
              success: false,
              content: 'Invalid Username or password!'
            }
          });
          setTimeout(() => {
            updateStore({
              alertShow: null
            });
          }, 5300)
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve(false);
      });
  });
}