import { data, countryCodes } from '_constant';

export function getRegions() {
  try {
    return data.map((i) => {
      return {
        value: i.r,
        text: i.r,
      };
    });
  } catch (error) {
    return [];
  }
}

export function getProvince(r) {
  try {
    return Object.keys(data.find((i) => i.r === r).p).map((key) => {
      return {
        value: key,
        text: key,
      };
    });
  } catch (error) {
    return [];
  }
}

export function getMunicipality(r, pKey) {
  try {
    return Object.keys(data.find((i) => i.r === r).p[pKey].m).map((key) => {
      return {
        value: key,
        text: key,
      };
    });
  } catch (error) {
    return [];
  }
}

export function getBarangay(r, pKey, mKey) {
  try {
    return data
      .find((i) => i.r === r)
      .p[pKey].m[mKey].b.map((key) => {
        return {
          value: key,
          text: key,
        };
      });
  } catch (error) {
    return [];
  }
}

export function getMobilePrefixOptions() {
  try {
    return countryCodes
      .sort((a, b) => {
        if (a.code < b.code) {
          return -1;
        }
        return 1;
      })
      .map((i) => {
        return {
          value: i.dial_code,
          text: `${i.dial_code} (${i.code})`,
        };
      });
  } catch (error) {
    return [];
  }
}
