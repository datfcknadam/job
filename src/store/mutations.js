export default {
  SET_CHOOSE_SHIP(state, value) {
    state.chooseShip = value;
    state.dateRent.name = state.ship[value].name;
  },
  CHANGE_RESULT(state, value) {
    state.result = value;
  },
  SET_EMAIL(state, value) {
    state.dataRent.userEmail = value;
  },
  SET_START_RENT(state, value) {
    state.dataRent.start = value;
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
};
