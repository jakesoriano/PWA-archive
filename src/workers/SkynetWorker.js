/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

self.onmessage = (ev) => {
  // encode params value
  let params = '';
  if (ev.data.options && ev.data.options.params) {
    for (const key in ev.data.options.params) {
      params += !params ? '?' : '&';
      params += `${key}=${encodeURIComponent(ev.data.options.params[key])}`;
    }
  }
  // send request
  axios(`${ev.data.url}${params}`, {
    ...(ev.data.options || {}),
    params: null
  })
    .then((res) => {
      // eslint-disable-next-line
			console.log(`Worker >> SkynetWorker >> Response`, res);
    })
    .catch((err) => {
      // eslint-disable-next-line
			console.log(`Worker >> SkynetWorker >> Error`, err);
    });
};
