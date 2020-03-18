import axios from 'axios';
import state from './state';

function post(url, data, handle) {
  axios
    .post(state.urlBackend + url, data)
    .then((response) => {
      handle(response.data);
    })
    .catch((error) => {

      if (error.response && error.response.data !== '') {
        handle(error.response.data.message);
      } else {
        handle(error);
      }
    });
}
function get(url, handle) {
  axios
    .get(state.urlBackend + url)
    .then((response) => {
      handle(response.data);
    })
    .catch((error) => {

      if (error.response && error.response.data !== '') {
        handle(error.response.data.message);
      } else {
        handle(error);
      }
    });
}
function postFile(url, data, handle) {
  axios
    .post(state.urlBackend + url, data, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=eweweweweww',
      },
    })
    .then((response) => {
      handle(response.data);
    })
    .catch((error) => {

      if (error.response && error.response.data !== '') {
        handle(error.response.data.message);
      } else {
        handle(error);
      }
    });
}
export default {
  post,
  postFile,
  get,
}
