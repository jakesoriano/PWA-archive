import { store } from '_unistore';
import { getLanguageCode } from '_helpers';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const gmtHours = 1000 * 60 * 60 * 8; // - 8 hours

export const dateEventFormat = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = new Date(new Date(date).getTime() - gmtHours);
    let month = d.getMonth();
    let day = d.getDate();
    day = day < 10 ? `0${day}` : day;
    const year = d.getFullYear();
    const time = d
      .toLocaleTimeString(getLanguageCode(selectedLanguage))
      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
    return `${monthNames[month]} ${day}, ${year} ${days[d.getDay()]}, ${time}`;
  } catch (error) {
    console.log('SPA >> Component dateEventFormat failed.', error);
    return date;
  }
};

export const dateNewsFormat = (date) => {
  try {
    return new Date(date).toLocaleDateString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.log('SPA >> Component dateNewsFormat failed.', error);
    return date;
  }
};

export const dateLastLoginFormat = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = date ? new Date(date) : new Date();
    // return d.toLocaleDateString(getLanguageCode(selectedLanguage), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
      d.toLocaleDateString(getLanguageCode(selectedLanguage), {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }) +
			' ' +
			d
			  .toLocaleTimeString(getLanguageCode(selectedLanguage))
			  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')
    );
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

export const dateWithinDays = (date, withinDays) => {
  try {
    let days = getDateDaysAway(date);
    return days === withinDays;
  } catch (error) {
    console.log('SPA >> Component checkIfDateWithin failed.', error);
    return date;
  }
};

export const getDateDaysAway = (date) => {
  try {
    const currDate = new Date();
    let diff = new Date(date).getTime() - currDate.getTime();
    let days = Math.trunc(diff / (1000 * 60 * 60 * 24));
    return days;
  } catch (error) {
    console.log('SPA >> Component checkIfDateWithin failed.', error);
    return date;
  }
};

export const getCountdown = (endDate) => {
  let currentDate = new Date().getTime();
  let targetDate = new Date(endDate).getTime();

  let seconds = (targetDate - currentDate) / 1000;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let finish = false;

  if (targetDate <= currentDate) {
    finish = true;
  }
  // calculate net remaining time based on gross values
  seconds = Math.floor(seconds - minutes * 60);
  minutes = Math.floor(minutes - hours * 60);
  hours = Math.floor(hours - days * 24);

  return {
    days: days < 10 ? '0' + days : days,
    hours: hours < 10 ? '0' + hours : hours,
    minutes: minutes < 10 ? '0' + minutes : minutes,
    seconds: seconds < 10 ? '0' + seconds : seconds,
    finish,
  };
};
export const getMonthYear = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = new Date(new Date(date).getTime() - gmtHours);
    let month = d.getMonth();
    let day = d.getDate();
    day = day < 10 ? `0${day}` : day;
    const year = d.getFullYear();
    const time = d
      .toLocaleTimeString(getLanguageCode(selectedLanguage))
      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
    return `${monthNames[month]} ${year}`;
  } catch (error) {
    console.log('SPA >> Component dateEventFormat failed.', error);
    return date;
  }
};
export const getDayText = (date) => {
  try {
    const d = new Date(new Date(date).getTime() - gmtHours);
    return days[d.getDay()];
  } catch (error) {
    console.log('SPA >> Component dateEventFormat failed.', error);
    return date;
  }
};
export const getDayNum = (date) => {
  try {
    const d = new Date(new Date(date).getTime() - gmtHours);
    let day = d.getDate();
    return day < 10 ? `0${day}` : day;
  } catch (error) {
    console.log('SPA >> Component getDayNum failed.', error);
    return '';
  }
};

export const getFormatedDate = (date) => {
  const { selectedLanguage } = store.getState();
  try {
    const d = new Date(new Date(date).getTime() - gmtHours);
    let month = d.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = d.getDate();
    day = day < 10 ? `0${day}` : day;
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.log('SPA >> Component getDate failed.', error);
    return date;
  }
};
