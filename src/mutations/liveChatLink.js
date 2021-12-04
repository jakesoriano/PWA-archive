/* eslint-disable import/prefer-default-export */
/** @format */

import { updateStore } from '_unistore';
import { xhr, urlLiveChatLink } from '_helpers';

export function fetchLiveChatLink () {
  return xhr(urlLiveChatLink)
    .then((response) => {
      updateStore({
        liveChatLink: response.ResponseData
      });
    })
    .catch((err) => {
      // eslint-disable-next-line
			console.log(`SPA >> fetchLiveChatLink ${err.message}`);

      // for fault tolerance, don't update store
    });
}
