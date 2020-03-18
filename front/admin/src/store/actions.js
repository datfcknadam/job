import api from '../../../client/src/store/api';

export default {
  uploadImage({commit}, value) {
    api.postFile('ship/upload', value, (response) => {
      if (response.avatar) commit('SET_AVATAR', response.avatar[0]);
      if (response.gallery) commit('SET_GALLERY', response.gallery);
    })
  },
  createNewSheep({state, commit}, value) {
    let avatar = state.avatar;
    let gallery =  state.gallery;
    let data = {
      value,
      avatar,
      gallery,
    };

    api.post('ship/create', data, (response) => {
      commit('SET_STATUS', response);
    });
  },
  getShips({commit}) {
    api.get('ship/read',  (response) => {
      commit('SET_SHIPS', response);
    });
  },
  getDataShip({commit}, params) {
    api.get(`ship/read/${params}`, (response) => {
      commit('SET_DATA_SHIP', response[0]);
    });
  },
};
