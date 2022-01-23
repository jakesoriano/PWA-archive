import { updateStore, store } from '_unistore';
import { xhr, urlCommunityInviteCode } from '_helpers';
import { nativeSetAuthToken } from '_platform/helpers';

export function useCode (data) {
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
          if(res.token) {
            const token =  JSON.parse(atob(res.token.split('.')[1]));
            const { authUser } = store.getState();
            updateStore({
              authUser: {
                ...authUser,
                token: res.token,
                profile: {
                  ...authUser.profile,
                  roles: token.roles
                }
              }
            });
            // set auth token in native
            nativeSetAuthToken(res.token);
          }
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