<template>
  <div class="main-content">
    <div class="main-content__top">
      <h1 class="main-content__title">VMware Automation Tool Designer</h1>
    </div>

    <div class="main-content__body">
      <div style="height: 720px; width: 1280px; border: 2px solid black; position: relative;">
        <vue-draggable-resizable
          :w="118"
          :h="136"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
          :grid="[20,20]"
          :drag-handle="drag-handle"
        >
          <div v-on:click="testConsole">
            <b-button size="sm" v-b-modal.modal-1>VM 세팅</b-button>
            <b-modal id="modal-1" centered title="BootstrapVue">
              <p class="my-4">Hello from modal!</p>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">VM 이름 :</label>
                </b-col>
                <b-col sm="2">
                  <b-form-input v-model="vmOptions[0].vm_name" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">CPU 코어 :</label>
                </b-col>
                <b-col sm="2">
                  <b-form-select v-model="vmOptions[0].num_cpus" :options="cpuOptions"></b-form-select>
                </b-col>
              </b-row>
            </b-modal>
          </div>
          <!-- <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p> -->
          <img src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/vm-icon-28.jpg" />
        </vue-draggable-resizable>

        <vue-draggable-resizable
          :w="118"
          :h="136"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
          :grid="[20,20]"
          :drag-handle="drag-handle"
        >
          <div v-on:click="testConsole">
            <b-button size="sm" v-b-modal.modal-2>VM 세팅</b-button>

            <b-modal id="modal-2" centered title="BootstrapVue">
              <p class="my-4">Hello from modal!</p>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">VM 이름 :</label>
                </b-col>
                <b-col sm="2">
                  <b-form-input v-model="vmOptions[1].vm_name" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">CPU 코어 :</label>
                </b-col>
                <b-col sm="2">
                  <b-form-select v-model="vmOptions[1].num_cpus" :options="cpuOptions"></b-form-select>
                </b-col>
              </b-row>
            </b-modal>
          </div>
          <!-- <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p> -->
          <img src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/vm-icon-28.jpg" />
        </vue-draggable-resizable>
      </div>
      <div id="terraform_execute" style="margin-left:1000px;margin-top:30px;">
        <!--condition check for all options were selected!-->
        <b-button pill variant="danger" v-on:click="refreshPage" style="margin-right:15px">Cancel</b-button>
        <b-button pill variant="info" v-on:click="runSave" style="margin-right:15px">Save</b-button>
        <b-button pill variant="primary" v-on:click="runTerra">Run Terraform</b-button>
      </div>

      <div
        style="float:right; margin-right:10px; margin-top:-788px; height: 720px; width: 300px; border: 2px solid black; position: relative;"
      >
        <b-button pill variant="primary" v-on:click="runTerra">Run Terraform</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "designer",
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      vmOptions: [
        {
          vCount: "",
          vm_name: "",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: ""
        },
        {
          vCount: "",
          vm_name: "",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: ""
        },
        {
          vCount: "",
          vm_name: "",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: ""
        },
        {
          vCount: "",
          vm_name: "",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: ""
        }
      ]
    };
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },
    testConsole: () => {
      console.log("heelo");
    }
  }
};
</script>
