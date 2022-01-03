import { store, updateStore } from '_unistore';
import { getTranslation, dateWithinDays, getDateDaysAway, dateEventFormat } from '_helpers';

export function generateNotifications () {
  let { notifications } = store.getState();
  let { lastDateNotified, lastDatePointsNotified } = notifications;

  if (!lastDateNotified || dateWithinDays(lastDateNotified, -1)) {

    const { members, events } = store.getState();

    // prep new data
    const pointsNotif = generatePointsNotification(members.data, lastDatePointsNotified);
    const eventsNotif = generateEventsNotification(events.data);
    const newData = [
      ...pointsNotif,
      ...eventsNotif
    ].sort((a, b) => a.date - b.date);

    if (newData.length) {

      // set isRead 
      let isNotificationsChanged = JSON.stringify(notifications.data) === JSON.stringify(newData);

      updateStore({
        notifications: {
          ...notifications,
          data: [
            ...pointsNotif,
            ...eventsNotif
          ],
          isRead: (isNotificationsChanged && notifications.isRead),
          lastDateNotified: new Date(),
          lastDatePointsNotified: lastDatePointsNotified
        }
      });
    }
  }
}

const generatePointsNotification = (members, lastDatePointsNotified) => {
  // check day if a Sunday before adding to notifications
  if (members && members.length) {

    if (!lastDatePointsNotified || dateWithinDays(lastDatePointsNotified, -7)) {
      lastDatePointsNotified = new Date();
    }

    if ((new Date(lastDatePointsNotified).toISOString().split('.')[0]+'Z' === new Date().toISOString().split('.')[0]+'Z')) {
      members.sort((a, b) => new Date(a.date) - new Date(b.date));
      let count = members
        .filter(item => (getDateDaysAway(item.profile.date) >= -7 && getDateDaysAway(item.profile.date) <= 0))
        .length;

      if (count) {
        return [
          propsTemplate(
            getTranslation('CONGRATULATIONS'),
            getTranslation('EARNED_POINTS')
              .replace(/{POINTS}/gim, (count * 100))
              .replace(/{MEMBERS_COUNT}/gim, count),
            'points'
          )
        ]
      }
    }
  }
  return [];
}

const generateEventsNotification = (events) => {
  const data = events
    .filter(item => [0, 1, 2].indexOf(getDateDaysAway(item.date)) > -1 && item.tagged === 'GOING')
    .map(item => 
      propsTemplate(
        getTranslation(item.title), 
        getTranslation('SEE_YOU')
          .replace(/{LOCATION}/gim, item.location)
          .replace(/{DATE}/gim, dateEventFormat(item.date)), 
        'event'
      )
    );
  return data;
}

const propsTemplate = (title, desc, type) => {
  return {
    title: title,
    description: desc,
    type: type,
    date: new Date()
  }
}