export default {
  urlBackend: 'http://localhost:3000/api/v1/',
  status: 0,
  chooseShip: 0,
  code: 0,
  ships: [],
  result: false,
  dataRent: {
    email: '',
    phone: '',
    date: new Date().toISOString().substr(0, 10),
    start: '08:00',
    sum: null,
    end: '09:00',
    ship_id: null,
  },
  success: false,
};
