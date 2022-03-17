import { store } from '_unistore';
import { formatNumber } from './number';

export function isUsingSocialLogin() {
  const { authUser } = store.getState();
  return Boolean(authUser && authUser.profile && authUser.profile.socId);
}

export function formatRank(rank) {
  return (rank || 0) <= 0 ? '-' : formatNumber(rank, 2);
}

export function displayName(profile) {
  let name = profile.fname || '';
  if (profile.lname) {
    return `${name} ${profile.lname || ''}`;
  }
  return name;
}
export function isUserUpdatedProfile() {
  const { authUser } = store.getState();
  // check if there is region on profile data
  return Boolean(authUser?.profile.region);
}
