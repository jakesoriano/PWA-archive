import { store } from '_unistore';
import { getCurrencyCode } from './language';

const pwaConfig = process.env.CONFIG;

export function getConfigByKey (key, subKey) {
  try {
    return subKey ? pwaConfig[key][subKey] : pwaConfig[key];
  } catch (error) {
    return null;
  }
}

export function overrideCurrencyCode () {
  const { selectedLanguage, authUser } = store.getState();
  if (authUser) {
    return authUser.CurrencyCode.toUpperCase();
    // } else if (isMYCountry()) {
    //   return 'MYR';
  }
  return (getCurrencyCode(selectedLanguage) || '').toUpperCase();
}

export function getDefaultAvatar() {
  return 'assets/images/myaccount_icon_inactive.png';
}
