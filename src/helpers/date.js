import { store } from '_unistore'
import { getLanguageCode } from '_helpers';

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dateEventFormat = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = new Date(date);
    let month = d.getMonth();
    let day = d.getDate();
    day = day < 10 ? `0${day}` : day;
    const year = d.getFullYear();
    const time = d.toLocaleTimeString(getLanguageCode(selectedLanguage)).replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return `${monthNames[month]} ${day}, ${year} ${days[d.getDay()]} ${time}`;
  } catch (error) {
    console.log('SPA >> Component dateEventFormat failed.', error);
    return date;
  }
};

export const dateLastLoginFormat = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = date ? new Date(date) : new Date();
    // return d.toLocaleDateString(getLanguageCode(selectedLanguage), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return d.toLocaleDateString(getLanguageCode(selectedLanguage), { year: 'numeric', month: 'numeric', day: 'numeric' }) 
      + ' ' +
      d.toLocaleTimeString(getLanguageCode(selectedLanguage)).replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  } catch (error) {
    console.log('SPA >> Component dateLastLoginFormat failed.', error);
    return date;
  }
};

export const getMaxDOBDate = () => {
  let today = new Date();
  // - 18 yrs
  let date = new Date(today.setYear(today.getFullYear() - 18));
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year + '-' + month + '-' + day;
};