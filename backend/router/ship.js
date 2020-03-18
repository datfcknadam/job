const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Sheep } = require('../mongoose/schema');
const ml = require('../multer/index');
const cpUpload = ml.upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 6 }]);
const ObjectID = require('mongodb').ObjectID;

router.post('/create', (req, res) => {
  const { body } = req;
  const pathGallery = [];
  body.gallery.forEach((element) => {
    pathGallery.append(element.path);
  });
  const construct = {
    name: body.value.name,
    description: body.value.description,
    price: body.value.price,
    volume: body.value.volume,
    avatar: body.avatar.path,
    gallery: pathGallery,
  }
  mFunctions.create(Sheep, construct, res);
});
router.post('/upload', cpUpload, (req, res) => {
  const { body } = req;
  res.json(req.files);
});
router.get('/read/:params', (req, res) => {
  const { params } = req;
  const data = params.params || {};
  ships: mFunctions.read(Sheep, res, { _id: new ObjectID(data) });
});
router.get('/read', (req, res) => {
  const { params } = req;
  const data = params || {};
  ships: mFunctions.read(Sheep, res);
});
router.post('/update', (req, res) => {
  const { body } = req;
  mFunctions.update(new Sheep());
});
router.post('/delete', (req, res) => {
  const { body } = req;
  mFunctions.drop(new Sheep());
});

module.exports = router;
