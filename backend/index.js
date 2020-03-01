const express = require('express');
const app = express();
const { apiUrl } = require('./global/index');
const { verification } = require('./emailjs/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/index');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(`${apiUrl}rent`, router.rent);
app.use(`${apiUrl}client`, router.client);
app.use(`${apiUrl}sheep`, router.sheep);
app.post(`${apiUrl}verification`,  (req, res) => verification(req, res));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
