import { store } from '_unistore';
import { xhr, urlContactUs, urlUploadFile } from '_helpers';
import axios from 'axios';

export function sendContactUs (data) {
  // current state
  const { authUser } = store.getState();
  const url = `${urlContactUs}/${authUser.profile._id}`;
  
  return new Promise((resolve) => {
    xhr(url, {
      method: 'POST',
      data
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

export function uploadFile (data) {
  const formData = new FormData();
  formData.append("file", data.file);
  const { authUser } = store.getState();
  return new Promise((resolve) => {
    // make axios post request
    axios({
      method: "post",
      url: urlUploadFile,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + authUser.token
      }
    })
      .then((res) => {
        if (res.data && res.data.success) {
          console.log(`SPA >> uploadFile successful`, res);
          resolve(res.data);
        } else {
          console.log(`SPA >> uploadFile Error`, res);
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
        console.log(`SPA >> uploadFile failed`, err);
      });
  });
}