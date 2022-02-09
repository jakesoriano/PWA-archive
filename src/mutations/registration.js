import { updateStore, store } from '_unistore';
import {
  xhr,
  urlValidateUsername,
  urlSignup,
  urlRegister,
  urlResendOTP,
  urlValidateMobile
} from '_helpers';
import {
  nativeSetAuthToken
} from '_platform/helpers';

export function validateUsername (username) {
  return new Promise((resolve) => {
    let url = urlValidateUsername.replace(/{username}/gim, username);
    xhr(url)
      .then((res) => {
        if (res) {
          // eslint-disable-next-line
          console.log(`SPA >> validateUsername successful`, res);
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> validateUsername Error`, err);
        resolve(false);
      });
  });
}

export function validateMobile (mobile) {
  return new Promise((resolve) => {
    let url = urlValidateMobile.replace(/{mobile}/gim, mobile);
    xhr(url)
      .then((res) => {
        if (res) {
          // eslint-disable-next-line
          console.log(`SPA >> validateMobile successful`, res);
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> validateMobile Error`, err);
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
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(res);
        console.log(`SPA >> completeSignup failed`, err);
      });
  });
}

export function completeRegister (data) {
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
            points: res.points || 0,
            rank: res.rank || 0,
            isNewUser: true
          }
          updateStore({
            authUser: res,
            customBack: null
          });
          // set auth token in native
          nativeSetAuthToken(res.token);
          // eslint-disable-next-line
          console.log(`SPA >> register successful`, res);
          resolve(res);
        } else {
          resolve(false);
        }
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
          console.log(`SPA >> resendOTP successful`, res);
          resolve(res);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> resendOTP failed`, err);
      });
  });
}