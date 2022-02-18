/* eslint-disable radix */
const cookieTimeLimit =
	24 * 60 * 60 * parseInt(process.env.COOKIE_TIME_LIMIT) * 1000;

function getMaxAge(epoc) {
  const currentDate = Date.now();
  return (epoc - currentDate) / 1000;
}

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
		console.log(`getCookie threw an error ${cname} : ${err.message}`);
    return null;
  }
}

export function setCookie (cname, value, noEncode) {
  document.cookie = `${cname}=${
    noEncode ? value : window.encodeURIComponent(value)
  }; path=/; max-age=${getMaxAge(
    Date.now() + cookieTimeLimit
  )}`;
}

export function setCookieWithExpiration (cname, value, expDate, noEncode) {
  document.cookie = `${cname}=${
    noEncode ? value : window.encodeURIComponent(value)
  }; path=/; max-age=${getMaxAge(expDate)}`;
}

export function removeCookie (cname) {
  document.cookie = `${cname}=; path=/; max-age=0`;
}
