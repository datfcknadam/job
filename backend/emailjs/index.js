const functions = require('../functions/index');
const email = require('emailjs');
const { settingSMPT } = require('../env/index');

let server = email.server.connect(settingSMPT);

const verification = (req, res) => {
  let { body } = req;
  let randN = functions.randNumber();
  let text = `Здравствуйте! Вы арендовали теплоход "${body.ship}" ${body.date} c ${body.start} до ${body.end} на сумму ${body.sum}руб\n
  Код для подтверждения ${randN}.`;
  server.send({
    text,
    from: "Речной порт <username@your-email.com>",
    to: body.userEmail,
    subject: `Аренда теплохода ${body.ship}`,
  }, function(err) {
    if (err) {
      res.send({status: 400})
    } else {
      res.send({code: randN, status: 200});
    }
  });
};

module.exports = {
  verification,
};
