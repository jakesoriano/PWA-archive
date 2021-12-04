/* eslint-disable radix */
const cookieTimeLimit =
	24 * 60 * 60 * parseInt(process.env.COOKIE_TIME_LIMIT) * 1000;

export function getDomain () {
  let domain = window.location.hostname.split('.');
  // local domain
  if (domain.length >= 4) {
    domain = window.location.hostname;
  } else {
    if (domain.length > 2) {
      domain.shift();
    }
    domain =
			domain[0] && domain[1] ? `.${domain[0]}.${domain[1]}` : `${domain[0]}`;
  }
  return domain;
}

export function getCookie (cname) {
  try {
    return document.cookie
      .split(';')
      .find((cookie) =>
        new RegExp(`^${cname}(=.*?)(?:;|$)`, 'i').test(cookie.trim())
      )
      .trim()
      .split('=')[1];
  } catch (err) {
    // eslint-disable-next-line
		console.log(`SPA >> getCookie threw an error ${cname} : ${err.message}`);
    return null;
  }
}

export function setCookie (cname, value, noEncode) {
  document.cookie = `${cname}=${
    noEncode ? value : window.encodeURIComponent(value)
  }; domain=${getDomain()}; path=/; expires=${new Date(
    Date.now() + cookieTimeLimit
  ).toGMTString()}`;

  // eslint-disable-next-line
	console.log(`SPA >> setCookie ${cname}=${value}`);
}

export function setCookieWithExpiration (cname, value, expDate, noEncode) {
  document.cookie = `${cname}=${
    noEncode ? value : window.encodeURIComponent(value)
  }; domain=${getDomain()}; path=/; expires=${new Date(expDate).toGMTString()}`;
  // eslint-disable-next-line
	console.log(`SPA >> setCookieWithExpiration ${cname}=${value}=${expDate}`);
}

export function removeCookie (cname) {
  document.cookie = `${cname}=; domain=${getDomain()}; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  // eslint-disable-next-line
	console.log(`SPA >> removeCookie ${cname}`);
}
