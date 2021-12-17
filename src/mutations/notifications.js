import { store, updateStore } from '_unistore';
import { xhr, urlNotifications } from '_helpers';

export function fetechNotifications (data) {
  
  const { notifications } = store.getState();
  if (notifications.fetching) {
    return;
  }
  // initial state
  updateStore({
    notifications: {
      ...notifications,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlNotifications, {
      method: 'GET'
    })
    .then((res) => {
      updateStore({
        notifications: {
          data: res,
          fetching: false,
          result: true
        }
      });
      console.log(`SPA >> fetechNotifications Success`, res.success);
      resolve(true);
    })
    .catch((err) => {
      updateStore({
        notifications: {
          ...notifications,
          fetching: false,
          result: false
        }
      });
      console.log(`SPA >> fetechNotifications Error`, err);
      resolve(false);
    });
  });
}