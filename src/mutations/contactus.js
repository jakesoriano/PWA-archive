import { updateStore, store } from '_unistore';
import {
  xhr,
  urlContactUs,
  urlIncidentReport,
  urlReport,
  urlApplyPollWatcher,
  urlReportFakeNews,
  urlReportSpamText,
} from '_helpers';

export function sendContactUs(data) {
  // current state
  const { authUser } = store.getState();
  const url = `${urlContactUs}/${authUser.profile._id}`;

  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> contactUs Error`, res);
          resolve(false);
        } else {
          console.log(`SPA >> contactUs successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> contactUs failed`, err);
      });
  });
}

export function sendIncidentReport(data) {
  // current state
  const { authUser } = store.getState();
  const url = `${urlIncidentReport}/${authUser.profile._id}`;

  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> sendIncidentReport Error`, res);
          resolve(false);
        } else {
          console.log(`SPA >> sendIncidentReport successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> sendIncidentReport failed`, err);
      });
  });
}
export function sendReport(data) {
  return new Promise((resolve) => {
    xhr(urlReport, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> sendReport Error`, res);
          resolve(res);
        } else {
          console.log(`SPA >> sendReport successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> sendReport failed`, err);
      });
  });
}
export function applyPollWatcher(data) {
  return new Promise((resolve) => {
    xhr(urlApplyPollWatcher, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> applyPollWatcher Error`, res);
          resolve(false);
        } else {
          console.log(`SPA >> applyPollWatcher successful`, res);
          const { authUser } = store.getState();
          updateStore({
            authUser: {
              ...authUser,
              profile: {
                ...authUser.profile,
                pollWatcher: res.profile.pollWatcher,
              },
            },
          });
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> applyPollWatcher failed`, err);
      });
  });
}
export function reportFakeNews(data) {
  return new Promise((resolve) => {
    xhr(urlReportFakeNews, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`SPA >> reportFakeNews Error`, res);
          resolve(res.error);
        } else {
          console.log(`SPA >> reportFakeNews successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`SPA >> reportFakeNews failed`, err);
      });
  });
}
export function reportSpamText(data) {
  return new Promise((resolve) => {
    xhr(urlReportSpamText, {
      method: 'POST',
      data,
    })
      .then((res) => {
        if (!res.success) {
          console.log(`sarsa SPA >> reportSpamText Error`, res);
          resolve(res.error);
        } else {
          console.log(`sarsa SPA >> reportSpamText successful`, res);
          resolve(res);
        }
      })
      .catch((err) => {
        resolve(err);
        console.log(`sarsa SPA >> reportSpamText failed`, err);
      });
  });
}
