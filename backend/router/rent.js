const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Rent, Ship } = require('../mongoose/schema');
const ObjectID = require('mongodb').ObjectID;

router.post('/create', (req, res) => {
  const { body } = req;
  mFunctions.readHandler(Ship, function (request) {
    const construct  = {
      date: body.date,
      sum,
      start: body.start,
      end: body.end,
      email: body.email,
      phone: body.phone,
      id_ship: body.ship_id,
    };
    mFunctions.create(Rent, construct, res);
  }, { _id: new ObjectID(body.ship_id)});
  /* mFunctions.create(Rent, body, res); */
});
router.get('/read', function(req, res) {
  res.send({rents: mFunctions.read(new Rent())});
});
router.post('/update', function(req, res) {
  const { body } = req;
  mFunctions.update(new Rent());
});
router.post('/delete', function(req, res) {
  const { body } = req;
  mFunctions.drop(new Rent());
});

module.exports = router;
