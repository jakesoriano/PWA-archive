import { updateStore, store } from '_unistore';
import { xhr, urlCommunityInviteCode, urlUserProfile } from '_helpers';
import { nativeSetAuthToken } from '_platform/helpers';

export function useCode(data) {
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
          if (res.token) {
            const token = JSON.parse(atob(res.token.split('.')[1]));
            const { authUser } = store.getState();
            updateStore({
              authUser: {
                ...authUser,
                token: res.token,
                profile: {
                  ...authUser.profile,
                  roles: token.roles,
                },
              },
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

export function updateProfile(data) {
  return new Promise((resolve) => {
    xhr(urlUserProfile, {
      method: 'PATCH',
      data,
    })
      .then((res) => {
        if (res && res.success) {
          // eslint-disable-next-line
					const { authUser } = store.getState();
          updateStore({
            authUser: {
              ...authUser,
              profile: {
                ...authUser.profile,
                fname: res.profile.fname,
                mname: res.profile.mname,
                lname: res.profile.lname,
                gender: res.profile.gender,
                birthday: res.profile.birthday,
                mobile: res.profile.mobile,
                region: res.profile.region,
                province: res.profile.province,
                municipality: res.profile.municipality,
                barangay: res.profile.barangay,
                isRegisteredVoter: res.profile.isRegisteredVoter,
                email: res.profile.email
              },
            },
          });
          console.log(`SPA >> updateProfile successful`, res);
        }
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line
				console.log(`SPA >> updateProfile Error`, err);
        resolve({
          success: false,
          error:
						err?.data?.message && err?.data?.message.length
						  ? err?.data?.message[0]
						  : 'SOMETHING_WRONG',
        });
      });
  });
}
