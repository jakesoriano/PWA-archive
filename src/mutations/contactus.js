import { store } from '_unistore';
import { xhr, urlContactUs, urlIncidentReport, urlReport } from '_helpers';

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
          resolve(false);
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
