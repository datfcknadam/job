import api from '../../../client/src/store/api';

export default {
  uploadImage({commit}, value) {
    api.postFile('ship/upload', value, (response) => {
      if (response.avatar) commit('SET_AVATAR', response.avatar[0]);
      if (response.gallery) commit('SET_GALLERY', response.gallery);
    })
  },
  createNewShip({state, commit}, value) {
    const avatar = state.avatar;
    const gallery =  state.gallery;
    const data = {
      value,
      avatar,
      gallery,
    };

    api.post('ship/create', data, (response) => {
      commit('SET_STATUS', response);
    });
  },
  getRent({commit}) {
    api.get('rent/read', async (response) => {
      commit('SET_RENTS', response);
    });
  },
  getShip({commit}) {
    api.get('ship/read', async (response) => {
      commit('SET_SHIPS', response);
    });
  },
  getDataRent({commit}, params) {
    api.get(`rent/read/${params}`, (response) => {
      commit('SET_DATA_RENT', response[0]);
    });
  },
  getDataShip({commit}, params) {
    api.get(`ship/read/${params}`, (response) => {
      commit('SET_DATA_SHIP', response[0]);
    });
  },
  editShip({state, commit}) {
    api.post('ship/update', state.dataShip, (response) => {
      commit('SET_STATUS', response);
    });
  },
  editRent({commit}, value) {
    api.post('rent/update', { ...value }, (response) => {
      commit('SET_STATUS', response);
    });
  },
  deleteRent({commit}, value) {
    api.post('rent/delete', {_id: value}, (response) => {
      commit('SET_STATUS', response);
    });
  },
  deleteShip({commit}, value) {
    api.post('ship/delete', {_id: value}, (response) => {
      commit('SET_STATUS', response);
    });
  },
};
