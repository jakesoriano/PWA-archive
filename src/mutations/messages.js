import { store, updateStore } from '_unistore';
import { xhr, urlMessages } from '_helpers';
// eslint-disable-next-line import/prefer-default-export
export function fetchMessages () {
    // curreny state
    const { messages } = store.getState();
  
    // initial state
    updateStore({
      messages: {
        ...messages,
        fetching: true,
        result: false
      }
    });
  
    return xhr(urlMessages)
      .then((res) => {
        updateStore({
          messages: {
            data: res.data.results,
            fetching: false,
            result: true
          }
        });
      })
      .catch(() => {
        updateStore({
          messages: {
            ...messages,
            fetching: false,
            result: false
          }
        });
      });
  }