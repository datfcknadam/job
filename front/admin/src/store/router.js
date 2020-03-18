import Request from '../pages/Request.vue';
import Ship from '../pages/Ship.vue';
import Client from '../pages/Client.vue';
import Router from 'vue-router';

const router = new Router({routes: [
  {
    path: '/',
    name: 'request',
    component: Request,
  },
  {
    path: '/ship',
    name:  'ship',
    component: Ship,
  },
  {
    path: '/client',
    name: 'client',
    component: Client,
  }
], mode: 'history'});

export default router;
