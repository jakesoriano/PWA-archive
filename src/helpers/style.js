/* eslint-disable import/prefer-default-export */
export function generateStyles (styles) {
  try {
    // construct CSS rules from config
    let css = '';
    if (styles) {
      styles.map((item) => {
        css = `${css} ${item.selector}{${item.style}} \n`;
        return css;
      });
    }
    return css;
  } catch (err) {
    // eslint-disable-next-line
		console.log('SPA >> (helpers/parse.js) >> generateStyles() >> ERROR', err);
    return null;
  }
}
