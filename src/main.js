import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import VueDraggableResizable from "vue-draggable-resizable";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.component("vue-draggable-resizable", VueDraggableResizable);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

window.bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
