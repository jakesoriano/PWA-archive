import { store, updateStore } from '_unistore';
import { xhr, urlInvited, getTraceID, showAlertBox } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchInvited() {
  // current state
  const { invited } = store.getState();

  // fetching
  if (invited.fetching) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // initial state
  updateStore({
    invited: {
      ...invited,
      fetching: true,
      result: false,
    },
  });

  return new Promise((resolve) => {
    xhr(urlInvited, {
      method: 'GET',
    })
      .then((res) => {
        updateStore({
          invited: {
            data: res.data,
            fetching: false,
            result: true,
          },
        });
        console.log(`SPA >> fetchInvitations Success`, res.success);
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          invited: {
            ...invited,
            fetching: false,
            result: false,
          },
        });
        console.log(`SPA >> fetchInvitations Error`, err);
        resolve(false);
      });
  });
}

export function newInvite(data) {
  return new Promise((resolve) => {
    xhr(urlInvited, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          const errorMessage = getTraceID(res);
          console.log(`SPA >> newInvite Error`, res);
          showAlertBox({
            message: errorMessage,
          });
          resolve(true);
        } else {
          console.log(`SPA >> newInvite successful`, res);
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> newInvite failed`, err);
      });
  });
}
