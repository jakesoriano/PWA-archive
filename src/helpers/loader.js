import { updateStore } from '_unistore';

// eslint-disable-next-line import/prefer-default-export
export function displayPageLoader (value) {
  updateStore({
    pageLoader: {
      display: value
    }
  }, true);
}
