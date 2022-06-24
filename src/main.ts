import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Chart } from "chart.js";
import Chartkick from "vue-chartkick";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
