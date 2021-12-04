// eslint-disable-next-line import/prefer-default-export
export function getGeoLocation (cbSucess, cbError) {
  const highPrioOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(
    (res) => {
      cbSucess({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        altitude: res.coords.altitude,
        accuracy: res.coords.accuracy,
        altitudeAccuracy: res.coords.altitudeAccuracy,
        heading: res.coords.heading,
        speed: res.coords.speed,
        timestamp: res.timestamp
      });
    },
    cbError,
    highPrioOptions
  );
}
