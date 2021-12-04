import { urlAnalytics } from '_helpers';
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

export function getSkynetAPI () {
  const { selectedLanguage } = store.getState();
  const api = urlAnalytics;
  try {
    if (pwaConfig.skynet && pwaConfig.skynet.api) {
      if (pwaConfig.skynet.api[selectedLanguage]) {
        return pwaConfig.skynet.api[selectedLanguage];
      }
      return pwaConfig.skynet.api.default;
    }
    return api;
  } catch (err) {
    // eslint-disable-next-line
		console.error('SPA >> getSkynetAPI:', err);
    return api;
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

export function isSkynetEnabled () {
  try {
    if (
      pwaConfig.skynet &&
			pwaConfig.skynet.disabled &&
			pwaConfig.skynet.disabled.indexOf(overrideCurrencyCode()) > -1
    ) {
      return false;
    }
    return true;
  } catch (err) {
    // eslint-disable-next-line
		console.error('SPA isSkynetEnabled:', err);
    return true;
  }
}
