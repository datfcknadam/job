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
const create = (model, data, handler) => {
  mConn();
    model.create(data, function(err) {
      mongoose.disconnect()
      console.log(err);
      if(!err) return handler.json(200);
      else handler.json(500);
    })
};
const read = (model, handler, data) => {
  mConn().then(() => {
    model.find(data, function(err, res) {
      mongoose.disconnect()
      handler.json(res);
  });
  }).catch((err) => console.log(err))
};
const readHandler = (model, handler, data) => {
  mConn().then(() => {
    model.find(data, function(err, res) {
      mongoose.disconnect()
      handler.call(null, res);
  });
  }).catch((err) => console.log(err))
};
const update = (model, handler, {_id, data}) => {
  console.log(data);
  mConn().then(() => {
    model.updateOne({_id: _id},  data, function(err, res) {
      mongoose.disconnect()
      if (err) return handler.json(500);
      return handler.json(200);
    })
  }).catch((err) => console.log(err));
};
const drop = (model, handler, data) => {
  mConn()
    .then(() => {
      model.remove({_id: data}, function(err, res) {
        mongoose.disconnect()
        if (err) return handler.json(500);
        return handler.json(200);
      });
    })
    .catch((errCon) => console.log(errCon));
};

module.exports = {
  create,
  read,
  update,
  drop,
  readHandler,
};
