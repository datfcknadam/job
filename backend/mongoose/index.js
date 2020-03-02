const mongoose = require('mongoose');
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB 
  } = require ('../env/index');

let url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}:${MONGO_HOST}:${MONGO_PORT}:/${MONGO_DB}`;
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const mConn = () => mongoose.connect(url, options);

const create = (model, data) => {
  mConn()
    .then(() => {
    return model.create(data).then((res) => console.log(res))
      .catch((err) => console.log(err));
  }).catch((errCon) => console.log(errCon));
  mongoose.disconnect();
};
const read = (model, data) => {
  mConn()
    .then(() => {
    return model.find(data).then((res) => console.log(res))
      .catch((err) => console.log(err));
  }).catch((errCon) => console.log(errCon));
  mongoose.disconnect();
};
const update = (model, {id, data}) => {
  mConn()
    .then(() => {
    return model.update(id, { $set: { data } }).then((res) => console.log(res))
      .catch((err) => console.log(err));
  }).catch((errCon) => console.log(errCon));
  mongoose.disconnect();
};
const drop = (model, data) => {
  mConn()
    .then(() => {
    return model.remove().then((res) => console.log(res))
      .catch((err) => console.log(err));
  }).catch((errCon) => console.log(errCon));
  mongoose.disconnect();
};

module.exports = {
  create,
  read,
  update,
  drop,
};
