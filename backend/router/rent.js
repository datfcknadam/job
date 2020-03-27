const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Rent } = require('../mongoose/schema');

router.post('/create', (req, res) => {
  const { body } = req;
  console.log(body);
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
