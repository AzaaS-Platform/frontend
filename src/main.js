import Vue from 'vue'
import VueRouter from 'vue-router';
import {Plugin} from 'vue-fragment'
import App from './App.vue'
import routes from './main/routes.js';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Plugin)


const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
