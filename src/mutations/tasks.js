import { store, updateStore } from '_unistore';
import { xhr, urlTasks } from '_helpers';

// eslint-disable-next-line import/prefer-default-export
export function fetchTasks () {
  // curreny state
  const { tasks } = store.getState();

  // check data once a day only
  const currentDate = Date.now();
  if (tasks.data && tasks.date && currentDate < tasks.date) {
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
      } else {
        updateStore({
          tasks: {
            ...tasks,
            fetching: false,
            result: false
          }
        });
      }
    })
    .catch(() => {
      updateStore({
        tasks: {
          ...tasks,
          fetching: false,
          result: false
        }
      });
    });
}

export function doneTask (id, token) {
  return new Promise((resolve) => {
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
    resolve(true);
  });
}
