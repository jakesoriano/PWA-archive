import { categories } from '_constant';

export function getCategories () {
  try {
    return categories.map(i => {
      return {
        value: i.c,
        text: i.c
      }
    });
  } catch (error) {
    return [];
  }
}