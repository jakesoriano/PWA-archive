import { store } from '_unistore';
import { urlUploadFile } from '_helpers';
import axios from 'axios';

export function resizeImage (settings) {
  // Ensure it's an image
  if (settings.file.type.match(/image.*/)) {
    var file = settings.file;
    var maxSize = settings.maxSize || 1200;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');
    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
  } else {
    return new Promise(resolve => {
      resolve(settings.file);
    });
  }
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
          'Authorization': `Bearer ${authUser.token}` 
        }
      })
        .then((res) => {
          if (res.data && res.data.success) {
            console.log(`SPA >> uploadFile successful`, res);
            resolve(res.data);
          } else {
            console.log(`SPA >> uploadFile Error`, res);
            resolve({
                success: false
            });
          }
        })
        .catch((err) => {
          resolve({
              success: false,
              errMessage: (err.response && err.response.status === 413) ? 'ERRMSG_FILESIZE' : null
          });
          console.log(`SPA >> uploadFile failed`, err);
        });
    });
  }