import { store } from '_unistore';

function getConfigData() {
  const { appConfig, appHomeConfig } = store.getState();
  return {
    ...appConfig.data,
    ...appHomeConfig.data,
  };
}

export function getConfigByKey(key, subKey) {
  const config = getConfigData();
  try {
    return subKey ? config[key][subKey] : config[key];
  } catch (error) {
    return null;
  }
}

export function getDefaultAvatar() {
  return 'assets/images/avatar.png';
}
