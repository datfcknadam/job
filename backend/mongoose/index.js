const mongoose = require('mongoose');
const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB
  } = require ('../env/index');

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}:/${MONGO_DB}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mConn = () => mongoose.connect(url, options);
const mDConn = () => mongoose.disconnect();
const create = (model, data, handler) => {
  mConn();
    model.create(data, function(err) {
      mDConn();
      if(!err) return handler.json(200);
      else handler.json(400);
    })
};
const read = (model, handler, data) => {
  mConn();
  model.find(data, function(err, res) {
    console.log(res);
    mDConn();
    handler.json(res);
  });
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
