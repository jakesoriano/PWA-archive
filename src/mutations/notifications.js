import { store, updateStore } from '_unistore';
import { getTranslation, dateWithinDays, getDateDaysAway, dateEventFormat } from '_helpers';

export function generateNotifications () {
  let { notifications } = store.getState();
  let { lastDateNotified, lastDatePointsNotified } = notifications;

  if (!lastDateNotified || dateWithinDays(lastDateNotified, -1)) {

    let { members, events } = store.getState();
    let data = [...notifications.data];

    generatePointsNotification(data, members.data, lastDatePointsNotified);

    generateEventsNotification(data, events.data);

    if (data.length) {
      // set isRead 
      let isNotificationsChanged = JSON.stringify(notifications.data) === JSON.stringify(data);
      data.sort((a, b) => a.date - b.date);

      updateStore({
        notifications: {
          ...notifications,
          data: data,
          isRead: (isNotificationsChanged && notifications.isRead),
          lastDateNotified: new Date(),
          lastDatePointsNotified: lastDatePointsNotified
        }
      });
    }
  }
}

const generatePointsNotification = (data, members, lastDatePointsNotified) => {
  // check day if a Sunday before adding to notifications
  if (members && members.length) {

    if (!lastDatePointsNotified || dateWithinDays(lastDatePointsNotified, -7)) {
      lastDatePointsNotified = new Date();
    }

    if ((new Date(lastDatePointsNotified).toISOString().split('.')[0]+'Z' === new Date().toISOString().split('.')[0]+'Z')) {
      members.sort((a, b) => new Date(a.date) - new Date(b.date));
      let tmpArr = members.filter(item => (getDateDaysAway(item.profile.date) >= -7 && getDateDaysAway(item.profile.date) <= 0));
      data.push(propsTemplate(getTranslation('CONGRATULATIONS'), getTranslation('EARNED_POINTS').replace(/{POINTS}/gim, (tmpArr.length * 100)).replace(/{MEMBERS_COUNT}/gim, tmpArr.length), 'points')); 
    }
  }
}

const generateEventsNotification = (data, events) => {
  let existingEvents = data.reduce((arr, {eventId}) => ((eventId ? arr.push(eventId) : undefined), arr), []);
  events.map((item) => {
    // check if event already exists in notification, only add if not existing
    if (existingEvents.indexOf(item.id) === -1) {
      // check if 2 days before event
      if ([0, 1, 2].indexOf(getDateDaysAway(item.date)) > -1)  {
        if (!data.includes(JSON.stringify(item))) {
          let template = propsTemplate(getTranslation(item.title), getTranslation('SEE_YOU').replace(/{LOCATION}/gim, item.location).replace(/{DATE}/gim, dateEventFormat(item.date)), 'event');
          template.eventId = item.id
          data.push(template)
        }
      }
    }
  });
}

const propsTemplate = (title, desc, type) => {
  return {
    title: title,
    description: desc,
    type: type,
    date: new Date()
  }
}