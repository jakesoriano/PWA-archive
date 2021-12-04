import { store } from '_unistore';

// eslint-disable-next-line import/prefer-default-export
export function getTranslation (key) {
  const { translation } = store.getState();

  try {
    // if (!store.selectedLanguage) {
    //   return '';
    // } else if (!store.translations.data) {
    //   return hardCodedTranslations[store.selectedLanguage][key] || defaultWord || key;
    // }

    return (
      translation.data.Contents[key] ||
			translation.data.Messages[key] ||
			translation.data.Rewards[key] ||
			key
    );
  } catch (err) {
    // eslint-disable-next-line
		console.log(`SPA >> getTranslation ${err.message}`, err);
    return key;
  }
}
