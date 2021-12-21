import { store, updateStore } from '_unistore';
import { getTranslation, dateWithinDays, getDateDaysAway, dateEventFormat } from '_helpers';

export function generateNotifications () {

  let { notifications, members, events } = store.getState(), data = [...notifications.data];

  generatePointsNotification(data, members.data);

  generateEventsNotification(data, events.data);

  // set isRead 
  let isNotificationsChanged = JSON.stringify(notifications.data) === JSON.stringify(data);
  data.sort((a, b) => a.date - b.date);

  updateStore({
    notifications: {
      ...notifications,
      data: data,
      isRead: isNotificationsChanged
    }
  });
}

const generatePointsNotification = (data, members) => {
  let lastDatePointsNotified = localStorage.getItem('lastDatePointsNotified');
  if (members && members.length) {

    if (!lastDatePointsNotified) {
      localStorage.setItem('lastDatePointsNotified', new Date());
      lastDatePointsNotified = localStorage.getItem('lastDatePointsNotified');
    }

    // check date if a week ago, or first notif before adding to notifications
    if (getDateDaysAway(lastDatePointsNotified) === -7 || (!getDateDaysAway(lastDatePointsNotified) && (new Date(lastDatePointsNotified).toISOString().split('.')[0]+'Z' === new Date().toISOString().split('.')[0]+'Z'))) {
      members.sort((a, b) => new Date(a.date) - new Date(b.date));
      let tmpArr = members.filter(item => (getDateDaysAway(item.profile.date) >= -7 && getDateDaysAway(item.profile.date) <= 0));
      data.push(propsTemplate('assets/images/icon_megaphone.png', getTranslation('CONGRATULATIONS'), getTranslation('EARNED_POINTS').replace(/{POINTS}/gim, (tmpArr.length * 100)).replace(/{MEMBERS_COUNT}/gim, tmpArr.length)));
    }
  }
}

const generateEventsNotification = (data, events) => {
  let existingEvents = data.reduce((arr, {eventId}) => ((eventId ? arr.push(eventId) : undefined), arr), []);
  events.map((item) => {
    // check if event already exists in notification, only add if not existing
    if (existingEvents.indexOf(item.id) === -1) {
      // check if 2 days before event
      if (dateWithinDays(item.date, 2)) {

        if (!data.includes(JSON.stringify(item))) {
          let template = propsTemplate('assets/images/icon_megaphone.png', getTranslation(item.title), getTranslation('SEE_YOU').replace(/{LOCATION}/gim, item.location).replace(/{DATE}/gim, dateEventFormat(item.date)));
          template.eventId = item.id
          data.push(template)
        }
      }
    }
  });
}

const propsTemplate = (image, title, desc) => {
  return {
    image: image,
    title: title,
    description: desc,
    date: new Date()
  }
}