function getKey (key) {
  return `${process.env.PREFIX}_${key}`;
}

export function getItem (key, cb) {
  if (cb) {
    try {
      const data = window.localStorage.getItem(getKey(key));
      cb(JSON.parse(data));
    } catch (err) {
      cb(null);
    }
  }
}

export function setItem (key, value) {
  window.localStorage.setItem(
    getKey(key),
    value ? JSON.stringify(value) : null
  );
}
