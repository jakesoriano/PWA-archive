import { categories } from '_constant';

export function getCategories () {
  try {
    return categories.map(i => {
      return {
        value: i,
        text: i
      }
    });
  } catch (error) {
    return [];
  }
}
