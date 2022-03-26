const validDomain = [
  'facebook.com/',
  'twitter.com/',
  'tiktok.com/',
  'youtube.com/'
]

export const validateDomain = (url) => {
  let valid = false
  validDomain.map(e => {
    if (url.indexOf(e) > -1) {
      valid = true;
    }
  })
  return valid
};

export const convertUrl = (url) => {
  let newUrl = '';
  validDomain.map(e => {
    if (url.indexOf(e) > -1) {
      const url_ = url.substring(url.indexOf(e)) 
      newUrl = `https://www.${url_}`
    }
  })
  return newUrl;
}

