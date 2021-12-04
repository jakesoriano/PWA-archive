// eslint-disable-next-line import/prefer-default-export
export function getGeoLocation (cbSucess, cbError) {
  const highPrioOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(cbSucess, cbError, highPrioOptions);
}
