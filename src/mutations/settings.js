import { updateStore } from '_unistore';
import {
  xhr,
  urlForgotPassword,
  urlForgotUsername,
  urlForgotSendOTP,
  urlForgotValidateOTP
} from '_helpers';

export function forgotCredentials (type, data) {
  let url = '';
  switch (type.toLowerCase()) {
    case 'sendotp':
      url = urlForgotSendOTP;
      break;
    case 'validateotp':
      url = urlForgotValidateOTP;
      break;
    case 'changepw':
      url = urlForgotPassword;
      break;
    case 'changeun':
      url = urlForgotUsername;
      break;
  }
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (res.success) {
          if (type.toLowerCase() === 'sendotp') {
            updateStore({
              forgot: {
                ...res,
                ...data
              }
            });
          }
        }
        console.log(`SPA >> forgotCredentials type: ${type} successful`, res);
        resolve(res);
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> forgotCredentials type: ${type} failed`, err);
      });
  });
}