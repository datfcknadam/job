import api from './api';

export default {
  verificationRent({
    state,
    commit
  }) {
    api.post('verification', state.dataRent, (response) => {
      if (response.status === 200) {
        commit('SET_CODE', response.code);
      }
      commit('SET_STATUS', response.status);
    });
  },
  sendDataRent({
    state,
    commit
  }) {
    api.post('rent/create', state.dataRent, (response) => {
      let success;
      if (response.status === 200) {
        success = true;
      }
      commit('SET_SUCCESS', success);
    });
  },
  getShips({commit}) {
    api.get('ship/read', (response) => {
      commit('SET_SHIPS', response);
    });
  },
};
