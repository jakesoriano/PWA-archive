import { store } from '_unistore'
import { getLanguageCode } from '_helpers';

export const formatNumber = (value, decimals) => {
  try {
    const { selectedLanguage } = store.getState();
    // 1. remove commas in the string and round off decimals
    value = value.toString().replace(/,/g, '');
    let parseValue = parseFloat(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(2);
    
    parseValue = parseInt(parseValue.toString().split('.')[1]) > 0 ? parseValue
      : parseFloat(parseValue).toFixed(0);

    // 2. return value based on languageCode else return value
    return !isNaN(parseValue) && Boolean(parseValue)  
      ? parseFloat(parseValue).toLocaleString(getLanguageCode(selectedLanguage))
      : value;
  } catch (error) {
    console.log('SPA >> Component format number failed.', error);
    return value;
  }
};

export const formatN = (value) => {
  if (value && !isNaN(value)) {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (value >= 10000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    if (value >= 1000) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } 
    return value;
  }
}