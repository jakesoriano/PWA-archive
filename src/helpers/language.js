import { updateStore } from '_unistore';

export const supportedLanguages = [
  {
    Name: 'English',
    langCode: 'en-us',
    langAlias: 'en',
    currencyCode: 'USD',
    flag: '{API_DOMAIN}_static/images/flags/en.jpg'
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
