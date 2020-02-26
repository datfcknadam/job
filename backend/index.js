let express = require('express');
let app = express();
let email = require('emailjs');
let cors = require('cors');
let functions = require('./functions/index');

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

let server = email.server.connect({
  user: "river.port1111@gmail.com",
  password: "Swordfish1!2@",
  host: "smtp.gmail.com",
  ssl: true,
  port: 465
});

app.get('/api/v1', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/v1/rent', function (req, res) {
  let { body } = req;
  let randN = functions.randNumber();
  let text = `Здравствуйте! Вы арендовали теплоход "${body.ship}" ${body.date} c ${body.start} до ${body.end} на сумму ${body.sum}руб \n
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
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
