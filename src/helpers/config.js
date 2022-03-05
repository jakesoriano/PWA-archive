import { store } from '_unistore';


export function getConfigByKey (key, subKey) {
  const { appConfig } = store.getState();
  try {
    return subKey ? appConfig.data[key][subKey] : appConfig.data[key];
  } catch (error) {
    return null;
  }
}

export function getDefaultAvatar() {
  return 'assets/images/avatar.png';
}

export function getShoutoutMessage(name) {
  return (<p className={`bold`}>Shoutout to <span className={`bold`}>{name}</span>! Number 1 KakamPink inviter! Galing!</p>);
}
