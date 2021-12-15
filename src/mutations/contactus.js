import { store } from '_unistore';
import { xhr, urlContactUs } from '_helpers';

export function sendContactUs (data) {
  // current state
  const { authUser } = store.getState();
  const url = `${urlContactUs}/${authUser.profile._id}`;
  
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> contactUs Error`, res);
          resolve(false);
        } else {
          console.log(`SPA >> contactUs successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> contactUs failed`, err);
      });
  });
}