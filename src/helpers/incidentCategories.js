import { incidentCategories , fakeNewsCategories } from '_constant';


export function getIncidentCategories() {
  try {
    return incidentCategories.map((i) => {
      return {
        value: i,
        text: i,
      };
    });
  } catch (error) {
    return [];
  }
}
export function getFakeNewsCategories() {
  try {
    return fakeNewsCategories.map((i) => {
      return {
        value: i,
        text: i,
      };
    });
  } catch (error) {
    return [];
  }
}
