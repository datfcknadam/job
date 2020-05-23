import f from '../functions/index';

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
    start: f.addHour(new Date().toLocaleTimeString().slice(0, 5)),
    sum: null,
    end: '23:59',
  },
  success: {
    value: false,
    success: false,
  },
};
