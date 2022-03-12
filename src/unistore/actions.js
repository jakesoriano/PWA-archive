import { getItem, setItem } from '_platform/helpers';
import store from './store';
import { initialStore } from './initialStore';

// export const actions = store => ({});

// restore data
async function getData(key) {
  return new Promise((resolve) => {
    getItem(key, (res) => {
      // with fetch and result
      if (initialStore[key] !== null && 'fetching' in initialStore[key]) {
        resolve({
          key,
          result: {
            ...(res || initialStore[key]),
            result: !!res,
            fetching: false,
          },
        });
      }

      // return data
      resolve({
        key,
        result: res,
      });
    });
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to getData', err);
    return {
      key,
      result: null,
    };
  });
}
export async function restoreData() {
  return Promise.all(Object.keys(initialStore).map((i) => getData(i))).then(
    (res) => {
      try {
        let savedStore = {};

        // filter response and set to saveStore
        // eslint-disable-next-line no-param-reassign
        res = res.filter((i) => i.result !== null);
        // eslint-disable-next-line no-restricted-syntax
        for (const data of res) {
          savedStore = { ...savedStore, [data.key]: data.result };
        }

        // sync to global state
        store.setState(savedStore);
        return true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to restore data', err);
        return false;
      }
    }
  );
}

// global method to update store
function syncDataToStorage(newState) {
  Object.keys(newState).forEach((key) => {
    if (key in initialStore) {
      setItem(key, newState[key]);
    }
  });
}
export function updateStore(newState, disabledCache) {
  // sync data to storage
  if (!disabledCache) {
    syncDataToStorage(newState);
  }
  // sync data to globa state
  store.setState(newState);
}

export function resetStore(cb) {
  try {
    updateStore(initialStore);
    if (cb) {
      cb();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('clear data error.', err);
  }
}
