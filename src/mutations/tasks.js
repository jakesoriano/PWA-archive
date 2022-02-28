import { store, updateStore } from '_unistore';
import {
  xhr,
  urlTasks,
  urlValidateTask,
  circleModal,
  getTranslation,
  getConfigByKey,
  setItemWithExpiry,
  getItemWithExpiry
} from '_helpers';


function taskNotification(data) {
  try {
    // check if there is pending tasks
    let storeData = store.getState();
    storeData = storeData.circleModal || null;
    const cookieKey = 'pt';
    const hasCookie = parseInt(getItemWithExpiry(cookieKey) || '0');
    const pendingTask = data.find(i => i.completed !== true);
    if (pendingTask && !hasCookie) {
      const expDate = Date.now() + ((1000 * 60) * getConfigByKey('taskNotifInterval'));
      setItemWithExpiry(cookieKey, 1, expDate);
      const data = {
        title: getTranslation('TASKS_NOTIF_TITLE'),
        content: getTranslation('TASKS_NOTIF_CONTENT'),
        link: {
          url: '/task-center',
          text: getTranslation('TASKS_NOTIF_LINK')
        }
      };
      circleModal(storeData ? {
        ...storeData,
        next: data
      } : data);
    }
  } catch(err) {
    console.error('taskNotification', err);
  }
};

// eslint-disable-next-line import/prefer-default-export
export function fetchTasks () {
  // curreny state
  const { tasks } = store.getState();

  // check data once a day only
  // const currentDate = Date.now();
  // if (tasks.data && tasks.date && currentDate < tasks.date) {
  if (tasks.fetching) {
    return;
  }
  
  // initial state
  updateStore({
    tasks: {
      ...tasks,
      fetching: true,
      result: false
    }
  });

  return xhr(urlTasks)
    .then((res) => {
      if (res.success && res.data && res.data.length) {
        updateStore({
          tasks: {
            data: res.data,
            fetching: false,
            result: true,
            date: new Date().setHours(23, 59, 50),
            completed: !Boolean(res.data.find(i => i.completed !== true))
          }
        });
        // task notification
        setTimeout(() => {
          taskNotification(res.data);
        }, 200);
      } else {
        updateStore({
          tasks: {
            ...tasks,
            fetching: false,
            result: false
          }
        });
      }
      return true;
    })
    .catch(() => {
      updateStore({
        tasks: {
          ...tasks,
          fetching: false,
          result: false
        }
      });
      return false;
    });
}

export function validateTask (id) {
  return new Promise((resolve) => {
    xhr(urlValidateTask.replace('{id}', id), {
      method: 'POST'
    })
      .then((res) => {
        if (res.success) {
          // curreny state
          const { tasks } = store.getState();
          // update status
          const newData = tasks.data.map(i => {
            if (i.id === id) {
              i.completed = true;
            }
            return i;
          })
          updateStore({
            tasks: {
              ...tasks,
              data: newData,
              completed: !Boolean(newData.find(i => i.completed !== true))
            }
          });
          return 1;
        } else {
          return 0;
        }
      })
      .catch((err) => {
        return -1;
      });
  });
}
