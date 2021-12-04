import { store } from '_unistore';

// eslint-disable-next-line import/prefer-default-export
export function getTranslation (key) {
  const { translation } = store.getState();
  try {
    return (
      translation.data[key] ||
			key
    );
  } catch (err) {
    // eslint-disable-next-line
		console.log(`SPA >> getTranslation ${err.message}`, err);
    return key;
  }
}
