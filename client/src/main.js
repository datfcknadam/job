import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import vueSmoothScroll from 'vue2-smooth-scroll'

Vue.use(vueSmoothScroll)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
