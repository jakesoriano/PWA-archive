import axios from 'axios';

self.onmessage = (ev) => {
  // url
  const url = ev.data.url
    .replace(/{_}/gim, Date.now())
    .replace(/{PUBLIC_PATH}/gim, ev.data.publicPath)
    .replace(
      /{langAlias}/gim,
      ev.data.language ? ev.data.language.langAlias : 'en'
    )
    .replace(
      /{langCode}/gim,
      ev.data.language ? ev.data.language.langCode : 'en-us'
    );
  // config
  const config = {
    ...(ev.data.options || {}),
    url,
    method: (ev.data.options && ev.data.options.method) || 'GET'
  };

  // Default Headers
  const jwtToken = (ev.data.options && ev.data.options.token ? ev.data.options.token : (ev.data.authUser ? ev.data.authUser.token : ''));
  config.headers = {};
  if (!ev.data.externalAPI) {
    config.headers = {
      // eslint-disable-next-line no-nested-ternary
      'Content-Type': 'application/json',
      ...(jwtToken && url.indexOf('.json') <= -1 ? {
        Authorization: 'Bearer ' + jwtToken,
      } : {})
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
      console.log(`Worker >> xhrWorker ${config.url}`, err);

      self.postMessage({
        error: (err.data && err.data.message) || err.message,
        status: err.response ? err.response.status : null,
        data: err.response.data
      });
    });
};
