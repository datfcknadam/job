import api from './api';

export default {
  sendDataRent({
    state,
    commit
  }) {
    api.post('rent', state.dataRent, (response) => {
      if (response.status === 200) {
        commit('SET_CODE', (response.code));
      }
      commit('SET_STATUS', (response.status));
    });
  },
};
