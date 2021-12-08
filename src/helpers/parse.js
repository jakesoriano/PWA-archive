import { store } from '_unistore';

// eslint-disable-next-line import/prefer-default-export
export function replaceUrlPlaceholders (url) {
  try {
    const { selectedLanguage } = store.getState();

    // domain
    let domain = '';
    if (typeof window !== 'undefined') {
      domain = window.location.hostname.replace(/^.*?\./, '');
    }

    let parsedUrl;
    if (url) {
      parsedUrl = url
        .replace(/{langAlias}/gim, selectedLanguage)
        .replace(/{API_DOMAIN}/gim, process.env.API_DOMAIN)
        .replace(/{PUBLIC_PATH}/gim, process.env.PUBLIC_PATH)
        .replace(/{TARGET}/gim, process.env.PLATFORM)
        .replace(/{DOMAIN}/gim, domain);
      return parsedUrl;
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line
		console.log(
      'SPA >> (helpers/parse.js) >> replaceUrlPlaceholders() >> ERROR',
      err
    );
  }
  return null;
}

export function getQueryStringValue (key) {
  try {
    const splitUrl = window.location.href.split('?');
    if (splitUrl.length > 1) {
      const urlParams = new URLSearchParams(`?${splitUrl[1]}`);
      // eslint-disable-next-line
			for (const [name, value] of urlParams) {
        if (name.toLowerCase() === key.toLowerCase()) {
          return value.replace(/ /g, '%2B');
        }
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}
