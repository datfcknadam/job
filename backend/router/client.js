const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Client } = require('../mongoose/schema');

router.post('/create', function(req, res) {
  const { body } = req;
  mFunctions.create(new Client());
});
router.get('/read', function(req, res) {
  res.send({clients: mFunctions.read(new Client())});
});
router.post('/update', function(req, res) {
  const { body } = req;
  mFunctions.update(new Client());
});
router.post('/delete', function(req, res) {
  const { body } = req;
  mFunctions.drop(new Client());
});

module.exports = router;
