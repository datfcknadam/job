import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import Router from 'vue-router'
import router from './store/router';

Vue.config.productionTip = false
Vue.use(Router);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
