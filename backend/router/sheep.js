const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Sheep } = require('../mongoose/schema');

router.post('/create', function(req, res) {
  const { body } = req;
  mFunctions.create(new Sheep());
});
router.get('/read', function(req, res) {
  res.send({sheeps: mFunctions.read(new Sheep())});
});
router.post('/update', function(req, res) {
  const { body } = req;
  mFunctions.update(new Sheep());
});
router.post('/delete', function(req, res) {
  const { body } = req;
  mFunctions.drop(new Sheep());
});

module.exports = router;
