import { store } from '_unistore';
import { xhr, urlCommunityInviteCode, urlUploadFile } from '_helpers';

export function useCode (data) {
  // current state
  const { authUser } = store.getState();
  const url = `${urlCommunityInviteCode}/${data.inviteCode}`;
  console.log('url', url);
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> Community Invite Code Error`, res);
          resolve(false);
        } else {
          console.log(`SPA >> Community Invite Code successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> Community Invite Code failed`, err);
      });
  });
}