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
// vm, db, network components
Vue.component("vm-component", {
  template: `<vue-draggable-resizable
  :x="12"
  :y="13"
  :w="74"
  :h="113"
  @dragging="onDrag"
  @resizing="onResize"
  :parent="true"
  :resizable="false"
  :grid="[20,20]"
>
  <img
    width="70px"
    src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/vm-icon-small.png"
  />
  <div v-on:click="testConsole">
    <b-button size="sm" v-b-modal.modal-1>{{instanceName}} 설정</b-button>
    <b-modal id="modal-1" centered title="VM Settings">
      <p class="my-4">VM 설정값을 입력하세요.</p>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="type-text">VM 이름 :</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="vmOptions[0].vm_name" :id="type-text" :type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="type-range">CPU 코어 :</label>
        </b-col>
        <b-col sm="5">
          <b-form-select v-model="vmOptions[0].num_cpus" :options="cpuOptions"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="type-range">RAM 용량 :</label>
        </b-col>
        <b-col sm="5">
          <b-form-select v-model="vmOptions[0].memory" :options="ramOptions"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="type-text">VM 디스크 용량 (GB) :</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="vmOptions[0].disk_size" :id="type-text" :type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="type-range">OS :</label>
        </b-col>
        <b-col sm="5">
          <b-form-select v-model="vmOptions[0].guest_id" :options="osOptions"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="vm-netowrk">네트워크 이름 :</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="vmOptions[0].vNetwork" :id="vm-netowrk" :type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label :for="vm-ip">IPv4 :</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            v-model="vmOptions[0].vm_ip"
            :id="vm-ip"
            :type="text"
            :state="cidrState"
            aria-describedby="vm-ip-feedback"
            placeholder="CIDR 형식"
          ></b-form-input>
          <b-form-invalid-feedback id="vm-ip-feedback">172.0.0.1/24와 같은 형식으로 입력!</b-form-invalid-feedback>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</vue-draggable-resizable>`,
  props: ["instanceName", "instanceIndex"]
});

Vue.component("db-component", {
  template:
    '<div>Card:<span style="background-color:blue">{{title}}</span></div>',
  props: ["title"]
});

Vue.component("network-component", {
  template:
    '<div>Card:<span style="background-color:yellow">{{title}}</span></div>',
  props: ["title"]
});

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

window.bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
