const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const ClientSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  selfnumber: String,
}, { versionKey: false });
const RentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  id_ship: {
    type: ObjectId,
    required: true,
    ref: 'Sheep',
  },
  id_client: {
    type: ObjectId,
    required: true,
    ref: 'Client',
  },
  created: { type: Date, default: Date.now },
}, { versionKey: false });
const SheepSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    avatar: true,
  },
  description: {
    type: String,
  },
  price:{
    type: Number,
    required: true,
  },
  gallery: [String],
  volume: {
    type: String,
  },
}, { versionKey: false });

const Client = mongoose.model('Client', ClientSchema);
const Rent = mongoose.model('Rent', RentSchema);
const Sheep = mongoose.model('Sheep', SheepSchema);

module.exports = {
  Client,
  Rent,
  Sheep,
}
