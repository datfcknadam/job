const multer = require('multer');

function randAa() {
  let s = '';
  while (s.length < 15) {
    s += String.fromCharCode(Math.random() * 127)
      .replace(/\W|\d|_/g, '');
  }
  return s;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const mimeFile = file.mimetype.split('/');
    if (mimeFile[0] === 'image') {
      cb(null, `./upload/${file.fieldname}`);
    }
  },
  filename(req, file, cb) {
    const mimeFile = file.mimetype.split('/');
    switch (mimeFile[0]) {
      case 'image': {
        cb(null, `${randAa()}.${mimeFile[1]}`);
        break;
      }
      default:
        break;
    }
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  randAa,
};
