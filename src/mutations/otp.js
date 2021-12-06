import { store, updateStore } from '_unistore';
import { xhr, urlOTP } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchOTP () {
  const { otp } = store.getState();
  // initial state
  updateStore({
    otp: {
      ...otp,
      fetching: true,
      result: false
    }
  });
  return xhr(urlOTP)
    .then((res) => {
      updateStore({
        otp: {
          data: res,
          fetching: false,
          result: true
        }
      });
      return res;
  })
  .catch((err) => {
    updateStore({
      otp: {
        ...otp,
        fetching: false,
        result: false
      }
    });
    return false;
  });
}
