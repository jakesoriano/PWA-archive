import { updateStore, store } from '_unistore';
import { xhr, urlValidateUsername, urlSignup, urlRegister } from '_helpers';

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
  return new Promise((resolve) => {
    xhr(urlSignup, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> validateUsername Error`, res.success);
          updateStore({
            alertShow: {
              success: false,
              content: 'Something went wrong!'
            }
          });
          setTimeout(() => {
            updateStore({
              alertShow: null
            });
          }, 5300)
        } else {
          console.log(`SPA >> validateUsername successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> validateUsername failed`, err);
      });
  });
}

export function verifyOTP (data) {
  return new Promise((resolve) => {
    xhr(urlRegister, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res.success) {
          console.log(`SPA >> completeRegistration successful`, res);
          res = {
            ...res,
            isNewUser: true
          }
          updateStore({
            authUser: res
          })
        }
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> completeRegistration Error`, err);
        resolve(false);
      });
  });
}