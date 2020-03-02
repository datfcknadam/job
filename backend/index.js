const express = require('express');
const app = express();
const { API_URL } = require('./env/index');
const { verification } = require('./emailjs/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/index');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(`${API_URL}rent`, router.rent);
app.use(`${API_URL}client`, router.client);
app.use(`${API_URL}sheep`, router.sheep);
app.post(`${API_URL}verification`,  (req, res) => verification(req, res));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
