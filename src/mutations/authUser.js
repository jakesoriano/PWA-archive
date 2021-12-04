import { updateStore } from '_unistore';
import { xhr, urlUserData, removeCookie } from '_helpers';

export function logOut (callback) {
  removeCookie('s');
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
        if (res.ResponseCode > 0) {
          updateStore({
            authUser: res.ResponseData
          });
          // eslint-disable-next-line
					console.log(`SPA >> fetchUserData successful`, res);
          resolve(true);
        } else {
          // eslint-disable-next-line
					console.log(
            'SPA >> fetchUserData >> Success but returned with errors',
            res
          );
          logOut();
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> fetchUserData Error`, err);
        resolve(false);
      });
  });
}
