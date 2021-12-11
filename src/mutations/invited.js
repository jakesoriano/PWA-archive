import { store, updateStore } from '_unistore';
import { xhr, urlInvited } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchInvited () {
  // current state
  const { invited } = store.getState();
  const { authUser } = store.getState();
  const urlInvitation = `${urlInvited}/${authUser.profile._id}`;
  
  // fetching
  if(invited.fetching) {
    return;
  }
  
  // initial state
  updateStore({
    invited: {
      ...invited,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlInvitation, {
      method: 'GET',
    })
    .then((res) => {
      updateStore({
        invited: {
          data: res.data,
          fetching: false,
          result: true
        }
      });
      resolve(true);
    })
    .catch(() => {
      updateStore({
        invited: {
          ...invited,
          fetching: false,
          result: false
        }
      });
      resolve(false);
    });
  });
}

export function newInvite (data) {
  // current state
  const { authUser } = store.getState();
  const urlInvitation = `${urlInvited}/${authUser.profile._id}`;
  
  return new Promise((resolve) => {
    xhr(urlInvitation, {
      method: 'POST',
      data
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> newInvite Error`, res);
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
          console.log(`SPA >> newInvite successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> newInvite failed`, err);
      });
  });
}