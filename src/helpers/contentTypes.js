import { contentTypes } from '_constant';

export function getContentTypes () {
  try {
    return contentTypes.map(i => {
      return {
        value: i,
        text: i
      }
    });
  } catch (error) {
    return [];
  }
}