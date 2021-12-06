import axios from 'axios';

self.onmessage = (ev) => {
  // url
  const url = ev.data.url
    .replace(/{_}/gim, Date.now())
    .replace(/{consumer}/gim, ev.data.platform.consumer)
    .replace(/{device}/gim, ev.data.platform.device)
    .replace(/{PUBLIC_PATH}/gim, ev.data.publicPath)
    .replace(
      /{langAlias}/gim,
      ev.data.language ? ev.data.language.langAlias : 'en'
    )
    .replace(
      /{langCode}/gim,
      ev.data.language ? ev.data.language.langCode : 'en-us'
    )
    .replace(
      /{currencyCode}/gim,
      ev.data.currencyCode || ev.data.language
        ? ev.data.language.currencyCode
        : 'USD'
    );
  // config
  const config = {
    ...(ev.data.options || {}),
    url,
    method: (ev.data.options && ev.data.options.method) || 'GET'
  };

  // Default Headers
  config.headers = {};
  if (!ev.data.externalAPI) {
    config.headers = {
      SubPlatformId: ev.data.platform.spfid,
      LanguageCode: ev.data.language ? ev.data.language.langCode : 'en-us',
      currencyCode:
				ev.data.currencyCode ||
				(ev.data.language ? ev.data.language.currencyCode : 'en-us'),
      // eslint-disable-next-line no-nested-ternary
      token: ev.data.options && ev.data.options.token
        ? ev.data.options.token
        : (ev.data.authUser ? ev.data.authUser.Token : ''),
      'Content-Type': 'application/json'
    };
  }
  // Custom Headers
  if (ev.data.options && ev.data.options.headers != null) {
    config.headers = {
      ...config.headers,
      ...ev.data.options.headers
    };
  }

  // Convert data
  if (ev.data.options && ev.data.options.convertData) {
    config.data = Object.keys(config.data)
      .map((key) => `${key}=${config.data[key]}`)
      .join('&');
  }

  axios(config)
    .then((res) => {
      self.postMessage({
        status: res.status,
        result: res.data
      });
    })
    .catch((err) => {
      // eslint-disable-next-line
			console.log(`Worker >> xhrWorker ${config.url} , ${err.message}`);

      self.postMessage({
        error: err.message,
        status: err.response ? err.response.status : null
      });
    });
};
