import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import { pollPlugin } from "./utils/pinia-poll";

Vue.config.productionTip = false;

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(pollPlugin);

new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
