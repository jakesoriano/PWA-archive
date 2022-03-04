import { store } from '_unistore';

export function isUserUpdatedProfile () {
  const { authUser } = store.getState();
  // check if there is region on profile data
  return Boolean(authUser?.profile.region);
}
