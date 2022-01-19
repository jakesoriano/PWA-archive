import { updateStore, store, initialStore } from '_unistore';
import {
  xhr,
  urlUser,
  urlUserLogin,
  removeCookie,
  urlUserPoints,
  urlChangePassword,
  urlUserProfile,
  urlUserLoginOTP
} from '_helpers';
import {
  nativeOnLogout,
  nativeSetAuthToken
} from '_platform/helpers';

export function logOut (callback) {

  const {
    news,
    events,
    members,
    invited,
    communities,
    notifications
  } = initialStore;

  removeCookie('token');
  updateStore({
    authUser: null,
    customBack: null,
    news,
    events,
    members,
    invited,
    communities,
    notifications,
    loginInfo: null,
  });
  nativeOnLogout();
  if (callback) {
    callback();
  }
}

// eslint-disable-next-line import/prefer-default-export
export function fetchUserData (token) {
  return new Promise((resolve) => {
    xhr(urlUser, {
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
        if (res.success) {
          // get current data
          const { authUser } = store.getState();
          if (authUser) {
            updateStore({
              authUser: {
                ...authUser,
                points: res.data.points,
                members: res.data.members,
                rank: {
                  regional: res.data.region,
                  overall: res.data.global
                }
              }
            });
          }
        }
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
  const { deviceId, loginInfo } = store.getState();
  const {
    news,
    events,
    members,
    invited,
    communities
  } = initialStore;
  return new Promise((resolve) => {
    xhr(urlUserLogin, {
      method: 'POST',
      data: {
        ...data,
        deviceId: 'B7BA296B-A979-4448-87C8-89ED30A73F19'
      }
    })
      .then((res) => {
        if (res && res.success) {
          updateStore({
            authUser: {
              ...res,
              points: res.points || 0,
              rank: res.rank || 0,
            },
            customBack: null,
            news,
            events,
            members,
            invited,
            communities,
            loginInfo: null
          });
          // set auth token in native
          nativeSetAuthToken(res.token);
          // eslint-disable-next-line
          console.log(`SPA >> login successful`, res);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve(err.data);
      });
  });
}

export function loginOTP (data) {
  const {
    news,
    events,
    members,
    invited,
    communities
  } = initialStore;
  return new Promise((resolve) => {
    xhr(urlUserLoginOTP, {
      method: 'POST',
      data
    })
      .then((res) => {
        console.log('resAuth', res);
        if (res && res.success) {
          updateStore({
            authUser: {
              ...res.data,
              points: res.data.points || 0,
              rank: res.data.rank || 0,
            },
            customBack: null,
            news,
            events,
            members,
            invited,
            communities,
            loginInfo: null
          });
          // set auth token in native
          nativeSetAuthToken(res.token);
          // eslint-disable-next-line
          console.log(`SPA >> login OTP successful`, res);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login OTP Error`, err);
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
        }
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> login Error`, err);
        resolve({
          success: false,
          error: {
            message: 'SOMETHING_WRONG'
          }
        });
      });
  });
}

export function updateAvatar (data) {
  return new Promise((resolve) => {
    xhr(urlUserProfile, {
      method: 'PATCH',
      data
    })
      .then((res) => {
        if (res && res.success) {
          // eslint-disable-next-line
          const { authUser } = store.getState();
          updateStore({
            authUser: {
              ...authUser,
              profile: {
                ...authUser.profile,
                image: data.image
              }
            }
          });
          console.log(`SPA >> updateAvatar successful`, res);
        }
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> updateAvatar Error`, err);
        resolve({
          success: false,
          error: {
            message: 'SOMETHING_WRONG'
          }
        });
      });
  });
}
