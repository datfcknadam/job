import axios from 'axios';
import state from './state';

axios.defaults.headers.post['Content-Type'] = 'text/plain';
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
export default {
  post,
}