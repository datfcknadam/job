import f from '../functions/index';

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
    console.log('ok');
    state.dataRent.start = value;
    if  (state.dataRent.start === "23:00") {
      state.dataRent.end = "23:59";
    } else {
      state.dataRent.end = f.addHour(value);
    }
  },
  SET_END_RENT(state, value) {
    state.dataRent.end = value;
  },
  SET_SUCCESS(state, value) {
    state.success = value;
  },
  SET_DATE_RENT(state, value) {
    const { dataRent } = state;
    dataRent.date = value;
    const today = Date.parse(new Date().toLocaleString());
    const dayRent = Date.parse(dataRent.date);
    if (today === dayRent) {
      this.commit('SET_START_RENT', (f.addHour(new Date().toLocaleTimeString().slice(0, 5))));
    }
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
