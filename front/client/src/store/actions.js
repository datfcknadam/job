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
      if (response === 200) {
        success = true;
      }
      state.dataRent = {
        _id: '',
        avatar: {},
        description: '',
        gallery: [],
        name: '',
        price: 0,
        volume: '',
      };
      commit('SET_SUCCESS', { value: true, success });
    });
  },
  getShip({commit}) {
    api.get('ship/read', (response) => {
      commit('SET_SHIPS', response);
    });
  },
};
