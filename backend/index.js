let express = require('express');
let app = express();
let email = require('emailjs');
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

app.post('/api/v1/sendmessage', function (req, res) {
  server.send({
    text: "Аренда теплохода",
    from: "Речной порт <username@your-email.com>",
    to: "benstiller68@gmail.com",
    cc: "else <else@your-email.com>",
    subject: "testing emailjs"
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
