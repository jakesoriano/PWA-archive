export function setItemWithExpiry (key, value, ttl) {console.error(key, value, ttl)
  const item = {
    value: value,
    expiry: ttl
  };
  window.localStorage.setItem(`ttl_${key}`, JSON.stringify(item));
}

export function getItemWithExpiry (key) {
  const itemStr = window.localStorage.getItem(`ttl_${key}`);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    window.localStorage.setItem(`ttl_${key}`, '');
    return null;
  }
  return item.value;
}
