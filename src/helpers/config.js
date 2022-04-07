import { store } from '_unistore';
import * as constant from '_constant';

function getConfigData() {
  const { appConfig, appHomeConfig } = store.getState();
  return {
    ...appConfig.data,
    ...appHomeConfig.data,
  };
}

function getConstant(key) {
  try {
    if (constant && constant[key]) {
      return constant[key];
    }
  } catch (err) {}

  return null;
}

export function getConfigByKey(key, subKey) {
  const config = getConfigData();
  try {
    // @ constant
    const constant = getConstant(key);
    if (constant) {
      return constant;
    }
    // @ config
    return subKey ? config[key][subKey] : config[key];
  } catch (error) {
    return null;
  }
}

export function getDefaultAvatar() {
  return 'assets/images/avatar.png';
}
