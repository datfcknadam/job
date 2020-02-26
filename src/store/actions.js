import api from './api';

export default {
  sendDataRent({
    state,
    commit
  }) {
    api.post('rent', state.dataRent, (response) => {
      commit('SET_STATUS', (response));
    });
  },
};
