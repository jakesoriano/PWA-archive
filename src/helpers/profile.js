import { store } from '_unistore';

export function isUserUpdatedProfile () {
  const { authUser } = store.getState();
  // check if there is region on profile data
  if (authUser?.profile?.region) return true;
  else return false
};