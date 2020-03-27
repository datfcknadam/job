export default {
  SET_AVATAR(state, value) {
    state.avatar = value;
    state.dataShip.avatar = value;
    state.dataShip.avatar.name = value.originalname;
  },
  SET_GALLERY(state, value) {
    state.gallery = value;
  },
  SET_SHIPS(state, value) {
    state.ships = value;
  },
  SET_DATA_SHIP(state, value) {
    const {_id, name, description, price, avatar, volume, gallery } = value;
    state.dataShip = {
      _id,
      name,
      description,
      price,
      volume,
      avatar: {
        name: avatar,
        path: avatar,
        lastModified: 0,
        lastModifiedDate: "",
        webkitRelativePath: "",
        size: 0,
        type: "image/jpeg",
      },
      gallery,
    };
  },
  SET_STATUS(state, value) {
    state.status = value;
  },
  SET_AVATAR_NAME(state, value) {
    state.dataShip.avatar.name = value;
  },
  SET_PRICE(state, value) {
    state.dataShip.price = value;
  },
  SET_VOLUME(state, value) {
    state.dataShip.volume = value;
  },
  SET_DESCRIPTION(state, value) {
    state.dataShip.description = value;
  },
  SET_NAME(state, value) {
    state.dataShip.name = value;
  },
};
