
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dateEventFormat = (date) => {
  try {
    const d = new Date(date);
    let month = d.getMonth();
    let day = d.getDate();
    day = day < 10 ? `0${day}` : day;
    const year = d.getFullYear();
    const time = d.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return `${monthNames[month]} ${day}, ${year} ${days[d.getDay()]} ${time}`;
  } catch (error) {
    console.log('SPA >> Component format number failed.', error);
    return date;
  }
};