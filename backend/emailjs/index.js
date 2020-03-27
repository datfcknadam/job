const sha1 = require('js-sha1');
const functions = require('../functions/index');
const email = require('emailjs');
const { SETTING_SMPT } = require('../env/index');

const server = email.server.connect(SETTING_SMPT);

const verification = (req, res) => {
  const { body } = req;
  const randN = functions.randNumber();
  const shaPass = sha1(randN);
  const text = `Здравствуйте! Вы арендовали теплоход "${body.ship}" ${body.date} c ${body.start} до ${body.end} на сумму ${body.sum}руб\n
  Код для подтверждения ${randN}.`;
  server.send({
    text,
    from: "Речной порт <username@your-email.com>",
    to: body.email,
    subject: `Аренда теплохода ${body.ship}`,
  }, function(err) {
    if (err) {
      res.send({status: 400})
    } else {
      res.send({code: shaPass, status: 200});
    }
  });
};

module.exports = {
  verification,
};
