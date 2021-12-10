import { updateStore, store } from '_unistore';
import { xhr, urlValidateUsername, urlSignup } from '_helpers';

export function validateUsername (username) {
  return new Promise((resolve) => {
    let url = urlValidateUsername.replace(/{username}/gim, username);
    xhr(url)
      .then((res) => {
        if (res) {
          // eslint-disable-next-line
          console.log(`SPA >> validateUsername successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> validateUsername Error`, err);
        resolve(false);
      });
  });
}

export function completeSignup (data) {
  console.log(data, 'data');
  return new Promise((resolve) => {
    xhr(urlSignup, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res) {
          // eslint-disable-next-line
          console.log(`SPA >> validateUsername successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> validateUsername Error`, err);
        resolve(false);
      });
  });
}

export function completeRegistration (data) {
  return new Promise((resolve) => {
    xhr(urlSignup, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res) {
          // eslint-disable-next-line
          console.log(`SPA >> validateUsername successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> validateUsername Error`, err);
        resolve(false);
      });
  });
}