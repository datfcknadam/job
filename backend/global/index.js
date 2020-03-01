const apiUrl = '/api/v1/';
const mongoServer = "0.0.0.0:27017";
const database = 'river-port';
const settingSMPT = {
  user: "river.port1111@gmail.com",
  password: "Swordfish1!2@",
  host: "smtp.gmail.com",
  ssl: true,
  port: 465
};

module.exports = {
  apiUrl,
  mongoServer,
  database,
  settingSMPT,
};
