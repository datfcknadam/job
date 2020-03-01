const mongoose = require('mongoose');
const { mongoServer, database } = require('../global/index');
const mConn = () => mongoose.connect(`mongodb://${mongoServer}/${database}`, { useNewUrlParser: true });

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
