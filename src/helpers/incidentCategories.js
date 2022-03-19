import { incidentCategories } from '_constant';

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
