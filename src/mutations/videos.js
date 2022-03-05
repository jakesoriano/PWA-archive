import { updateStore, store } from '_unistore';
import {
  xhr,
  urlVideos
} from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function filterVideos(name, page, limit) {
  // curreny state
  const { videos } = store.getState();

  // fetching
  if (videos.fetching) {
    return;
  }

  // initial state
  updateStore({
    videos: {
      ...videos,
      fetching: true,
      result: false
    }
  });
  
  return new Promise((resolve) => {
    xhr(urlVideos, {
      params: {
        q: name || '', // query string
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
      .then((res) => {
        updateStore({
          videos: {
            data: page && page > 1 ? [
              ...videos.data,
              ...res.data.results
            ] : res.data.results,
            total: res.data.total,
            page: page || 1,
            fetching: false,
            result: true
          }
        });
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          videos: {
            ...videos,
            fetching: false,
            result: false
          }
        });
        resolve(false);
      });
  });
}

export function fetchVideos(page, limit) {
  // curreny state
  const { videos } = store.getState();

  // fetching
  if (videos.fetching) {
    return;
  }

  // initial state
  updateStore({
    videos: {
      ...videos,
      fetching: true,
      result: false
    }
  });

  return new Promise((resolve) => {
    xhr(urlVideos, {
      params: {
        p: page || 1, // page number
        s: limit || 6 // limit
      }
    })
      .then((res) => {
        updateStore({
          videos: {
            ...videos,
            data: page && page > 1 ? [
              ...videos.data,
              ...res.data.results
            ] : res.data.results,
            total: res.data.total,
            page: page || 1,
            fetching: false,
            result: true
          }
        });
        resolve(true);
      })
      .catch((err) => {
        updateStore({
          videos: {
            ...videos,
            fetching: false,
            result: false
          }
        });
        resolve(false);
      });
  });
}


