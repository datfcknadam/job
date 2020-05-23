const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Rent, Ship } = require('../mongoose/schema');
const ObjectID = require('mongodb').ObjectID;

router.post('/create', (req, res) => {
  const { body } = req;
  mFunctions.readHandler(Ship, function (request) {
    mFunctions.create(Rent, body, res);
  }, { _id: new ObjectID(body.ship_id)});
});
router.get('/read', function(req, res) {
  mFunctions.read(Rent, res);
});
router.post('/update', function(req, res) {
  const { body } = req;
  mFunctions.update(Rent, res, { _id: body, data: body });
});
router.post('/delete', function(req, res) {
  const { body } = req;
  mFunctions.drop(Rent, res, body._id);
});

module.exports = router;
