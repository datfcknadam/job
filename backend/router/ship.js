const express = require("express");
const router = express.Router();
const mFunctions = require('../mongoose/index');
const { Ship } = require('../mongoose/schema');
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
  mFunctions.create(Ship, construct, res);
});
router.post('/upload', cpUpload, (req, res) => {
  res.json(req.files);
});
router.get('/read/:params', (req, res) => {
  const { params } = req;
  const data = params.params || {};
  mFunctions.read(Ship, res, { _id: new ObjectID(data) });
});
router.get('/read', (req, res) => {
  mFunctions.read(Ship, res);
});
router.post('/update', (req, res) => {
  const { body } = req;
  const data = {
    name: body.name,
    description: body.description,
    price: body.price,
    volume: body.volume,
    avatar: body.avatar.path,
    gallery: body.gallery,
  }
  mFunctions.update(Ship, res, {_id: body._id, data});
});
router.post('/delete', (req, res) => {
  const { body } = req;
  mFunctions.drop(Ship, res, body._id);
});

module.exports = router;
