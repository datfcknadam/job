function addHour (h) {
  let date = new Date();
  let splitH = h.split(":");
  let hour = parseInt(splitH[0], 10);
  date.setHours(hour + 1);
  return `${date.getHours().toString()}:${splitH[1]}`;
}

export default {
  addHour,
};
