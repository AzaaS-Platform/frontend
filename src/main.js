import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import routes from "./main/routes.js";

Vue.config.productionTip = false;

Vue.use(VueRouter);


const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
/*
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Table },
    { path: '/test', component: AddUser },
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
*/
