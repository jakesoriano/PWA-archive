import { store } from '_unistore';
import { formatNumber } from './number';

export function isUsingSocialLogin () {
  const { authUser } = store.getState();
  return Boolean(authUser && authUser.profile && authUser.profile.socId);
}

export function formatRank(rank) {
  return (rank || 0) <= 0 ? '-' : formatNumber(rank, 2);
}