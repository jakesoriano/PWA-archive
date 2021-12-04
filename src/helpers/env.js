export const urlUserData = `${process.env.API_DOMAIN}_secure/ajax/user/account?_={_}`;
export const urlGrid = '/{PUBLIC_PATH}assets/data/grid.json';
export const urlLiveChatLink = `${process.env.API_DOMAIN}_secure/ajax/livechat?_={_}`;
export const urlAnalytics = 'https://skynet.whiteproj.com';
export const urlTranslation =
	'/{PUBLIC_PATH}assets/data/translations/{langAlias}.json';
export const urlDashboard = '/{PUBLIC_PATH}assets/data/dashboard.json';
export const urlGames = '/{PUBLIC_PATH}assets/data/games.json';
export const urlLottery = '/{PUBLIC_PATH}assets/data/lottery.json';
export const urlPopupModule = '/{PUBLIC_PATH}assets/data/popupmodule.json';

// asset domain cdn
export const assetDomainCDN = {
  default: 'https://mcdn.w88ux.net/_static/',
  cn: 'https://mstatic.media884.com/_static/'
};

// asset domain pwa
export const assetDomainPWA = {
  default: 'https://static-global.static-bifrost.com/pwa_statics/',
  cn: 'https://contents.candy-assets.com/pwa_statics/',
  id: 'https://static-id.static-bifrost.com/pwa_statics/',
  vn: 'https://static-vn.static-bifrost.com/pwa_statics/',
  th: 'https://static-th.static-bifrost.com/pwa_statics/'
};
