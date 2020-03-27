function addHour(h) {
  let date = new Date();
  let splitH = h.split(":");
  let hour = parseInt(splitH[0], 10);
  date.setHours(hour + 1);
  return `${date.getHours().toString()}:${splitH[1]}`;
}

export default {
  SET_CHOOSE_SHIP(state, value) {
    state.chooseShip = value;
    state.dateRent.ship = state.ships[value].name;
    state.dateRent.ship_id = state.ships[value]._id;
  },
  CHANGE_RESULT(state, value) {
    state.result = value;
  },
  SET_EMAIL(state, value) {
    state.dataRent.email = value;
  },
  SET_START_RENT(state, value) {
    state.dataRent.start = value;
    state.dataRent.end = addHour(value);
  },
  SET_END_RENT(state, value) {
    state.dataRent.end = value;
  },
  SET_DATE_RENT(state, value) {
    state.dataRent.date = value;
  },
  SET_SUM_RENT(state, value) {
    state.dataRent.sum = value;
  },
  SET_STATUS(state, value) {
    state.status = value;
  },
  SET_SHIP_ID(state, value) {
    state.dataRent.ship_id = value;
  },
  SET_SHIP_NAME(state, value) {
    state.dataRent.ship = value;
  },
  SET_CODE(state, value) {
    state.code = value;
  },
  SET_PHONE(state, value) {
    state.dataRent.phone = value;
  },
  SET_SHIPS(state, value) {
    state.ships = value;
  },
};
