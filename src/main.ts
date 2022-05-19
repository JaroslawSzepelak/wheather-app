import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import VueSession from "vue-session";

Vue.use(VueSession);
Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
