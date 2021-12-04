import { updateStore } from '_unistore';

export const supportedLanguages = [
  {
    Name: 'English',
    langCode: 'en-us',
    langAlias: 'en',
    currencyCode: 'USD',
    flag: '{API_DOMAIN}_static/images/flags/en.jpg'
  },
  {
    Name: '简体中文',
    langCode: 'zh-cn',
    langAlias: 'cn',
    currencyCode: 'RMB',
    flag: '{API_DOMAIN}_static/images/flags/cn.jpg'
  },
  {
    Name: 'Bhs Indonesia',
    langCode: 'id-id',
    langAlias: 'id',
    currencyCode: 'IDR',
    flag: '{API_DOMAIN}_static/images/flags/id.jpg'
  },
  {
    Name: 'India',
    langCode: 'en-in',
    langAlias: 'in',
    currencyCode: 'INR',
    flag: '{API_DOMAIN}_static/images/flags/in.jpg'
  },
  {
    Name: 'ខ្មែរ',
    langCode: 'km-kh',
    langAlias: 'kh',
    currencyCode: 'MYR',
    flag: '{API_DOMAIN}_static/images/flags/kh.jpg'
  },
  {
    Name: '한국어',
    langCode: 'ko-kr',
    langAlias: 'kr',
    currencyCode: 'KRW',
    flag: '{API_DOMAIN}_static/images/flags/kr.jpg'
  },
  {
    Name: 'ไทย',
    langCode: 'th-th',
    langAlias: 'th',
    currencyCode: 'THB',
    flag: '{API_DOMAIN}_static/images/flags/th.jpg'
  },
  {
    Name: 'Tiếng Việt',
    langCode: 'vi-vn',
    langAlias: 'vn',
    currencyCode: 'VND',
    flag: '{API_DOMAIN}_static/images/flags/vn.jpg'
  },
  {
    Name: 'English',
    langCode: 'en-au',
    langAlias: 'au',
    currencyCode: 'AUD',
    flag: '{API_DOMAIN}_static/images/flags/au.png'
  }
];

// eslint-disable-next-line import/prefer-default-export
export function updateLanguage (langAlias) {
  if (langAlias) {
    updateStore({
      selectedLanguage: langAlias
    });
    // eslint-disable-next-line
		console.log(
      `SPA >> (mutations/language.js) >> Updated app language to ${langAlias}`
    );
  }
}

export function getDefaultLanguage () {
  try {
    const fromBrowser = (window.navigator.language || '')
      .split('-')
      .map((i) => i.toLocaleLowerCase());
    const langBrowser =
			fromBrowser.length > 1 && ['in', 'au'].indexOf(fromBrowser[1]) > -1
			  ? fromBrowser[1]
			  : fromBrowser[0];

    // if navigator language is in supported language
    if (langBrowser) {
      return langBrowser;
    }
    return 'en';
  } catch (err) {
    return 'en';
  }
}

export function getCurrencyCode (langCodeOrAlias) {
  const lang = supportedLanguages.find(
    (i) => i.langAlias === langCodeOrAlias || i.langCode === langCodeOrAlias
  );
  return lang && lang.currencyCode;
}

export function getLanguageCode (langCodeOrAlias) {
  const lang = supportedLanguages.find(
    (i) => i.langAlias === langCodeOrAlias || i.langCode === langCodeOrAlias
  );
  return lang && lang.langCode;
}

export function getLanguageAlias (langCodeOrAlias) {
  const lang = supportedLanguages.find(
    (i) => i.langAlias === langCodeOrAlias || i.langCode === langCodeOrAlias
  );
  return lang && lang.langAlias;
}

export function getLanguageInfo (langCodeOrAlias) {
  return supportedLanguages.find(
    (i) => i.langAlias === langCodeOrAlias || i.langCode === langCodeOrAlias
  );
}
