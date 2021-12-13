import { updateStore, store } from '_unistore';
import {
  xhr,
  urlValidateUsername,
  urlSignup,
  urlRegister,
  urlResendOTP
} from '_helpers';

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
        if (res.success) {
          console.log(`SPA >> completeSignup successful`, res);
          updateStore({
            signup: {
              ...data,
              registrationId: res.id,
            }
          });
        }
        resolve(res);
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> completeSignup failed`, err);
      });
  });
}

export function completeRegister (data) {
  console.log(data, 'data')
  return new Promise((resolve) => {
    xhr(urlRegister, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res.success) {
          console.log(`SPA >> completeRegister successful`, res);
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
				console.log(`SPA >> completeRegister Error`, err);
        resolve(false);
      });
  });
}

export function resendOTP (data) {
  return new Promise((resolve) => {
    xhr(urlResendOTP, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res.success) {
          console.log(`SPA >> completeSignup successful`, res);
          updateStore({
            signup: {
              ...data,
              registrationId: res.id,
            }
          });
        }
        resolve(res);
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> completeSignup failed`, err);
      });
  });
}