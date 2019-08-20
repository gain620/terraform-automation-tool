<template>
  <div class="main-content">
    <div class="main-content__top">
      <h1 class="main-content__title">VMware Automation Tool Designer</h1>
    </div>

    <div class="main-content__body">
      <div
        id="testDiv"
        style="height: 450px; width: 700px; border: 2px solid black; position: relative;"
      >
        <!--Network instances-->
        <vue-draggable-resizable
          style="border-style:solid;"
          v-for="(inst, index) in nwInstances"
          :key="index"
          :x="inst.x"
          :y="inst.y"
          :w="180"
          :h="120"
          @dragging="showCoords(inst)"
          @resizing="onResize"
          :parent="true"
          :resizable="true"
        >
          <div class="instCl">
            <!-- <b-button size="sm" v-b-modal="inst.vmModal">VM 설정</b-button> -->
            <img
              v-on:dblclick="destroyNW(inst.nwModal)"
              width="30px"
              src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/nwIcon.png"
            />
            <span v-on:dblclick="$bvModal.show(inst.nwModal)">{{inst.nw_name}}</span>
          </div>
        </vue-draggable-resizable>

        <vue-draggable-resizable
          style="border-style:hidden;"
          v-for="(inst, index) in vmInstances"
          :key="index"
          :x="inst.x"
          :y="inst.y"
          :w="73"
          :h="98"
          @dragging="showCoords(inst)"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
        >
          <img
            v-on:dblclick="destroyVM(inst.vmModal)"
            width="70px"
            src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/vmIcon.png"
          />
          <div class="instCl">
            <!-- <b-button size="sm" v-b-modal="inst.vmModal">VM 설정</b-button> -->
            <p v-on:dblclick="$bvModal.show(inst.vmModal)">{{inst.vm_name}}</p>
            <b-modal :id="inst.vmModal" centered title="VM Settings">
              <p class="my-4">VM 설정값을 입력하세요.</p>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">VM 이름 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.vm_name" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">CPU 코어 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.num_cpus" :options="cpuOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">RAM 용량 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.memory" :options="ramOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">VM 디스크 용량 (GB) :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.disk_size" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">OS :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.guest_id" :options="osOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="vm-netowrk">네트워크 이름 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.vNetwork" :id="vm-netowrk" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="vm-ip">IPv4 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input
                    v-model="inst.vm_ip"
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
        </vue-draggable-resizable>

        <!-- test DB -->
        <vue-draggable-resizable
          style="border-style:hidden;"
          v-for="(inst, index) in dbInstances"
          :key="index"
          :x="inst.x"
          :y="inst.y"
          :w="63"
          :h="102"
          @dragging="showCoords(inst)"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
        >
          <img
            v-on:dblclick="destroyDB(inst.dbModal)"
            width="60px"
            src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/dbIcon.png"
          />
          <div class="instCl">
            <!-- <b-button size="sm" v-b-modal.modal-2>DB 설정</b-button> -->
            <p v-on:dblclick="$bvModal.show(inst.dbModal)">{{inst.vm_name}}</p>
            <b-modal :id="inst.dbModal" centered title="DB Settings">
              <p class="my-4">DB 설정값을 입력하세요.</p>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">DB 이름 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.vm_name" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">CPU 코어 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.num_cpus" :options="cpuOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">RAM 용량 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.memory" :options="ramOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-text`">DB 디스크 용량 (GB) :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.disk_size" :id="`type-text`" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">OS :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.guest_id" :options="osOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="`type-range`">DBMS :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-select v-model="inst.dbms_name" :options="dbmsOptions"></b-form-select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="vm-netowrk">네트워크 이름 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input v-model="inst.vNetwork" :id="vm-netowrk" :type="text"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="3">
                  <label :for="vm-ip">IPv4 :</label>
                </b-col>
                <b-col sm="5">
                  <b-form-input
                    v-model="inst.vm_ip"
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
        </vue-draggable-resizable>
      </div>
      <div id="terraform_execute" style="margin-left:580px;margin-top:20px; margin-bottom:30px;">
        <!--condition check for all options were selected!-->
        <b-button pill variant="danger" v-on:click="refreshPage" style="margin-right:15px">Cancel</b-button>
        <b-button
          pill
          variant="info"
          v-on:click="openModal('bv-modal-loadInfra')"
          style="margin-right:15px"
        >Load</b-button>
        <b-button
          pill
          variant="info"
          v-on:click="openModal('bv-modal-saveInfra')"
          style="margin-right:15px"
        >Save</b-button>
        <b-button pill variant="primary" v-on:click="testConsole">Run Terraform</b-button>
      </div>

      <div
        style="float:right; margin-right:10px; margin-top:-540px; height: 450px; width: 200px; border: 2px solid black; position: relative;"
      >
        <b-button variant="primary" v-on:click="addVM" style="margin-bottom:10px">Add VM</b-button>
        <b-button variant="info" v-on:click="addNW" style="margin-bottom:10px">Add Network</b-button>
        <b-button variant v-on:click="addDB" style="margin-bottom:10px">Add DB</b-button>
      </div>
    </div>

    <!--saveInfraModal-->
    <b-modal id="bv-modal-saveInfra" hide-footer>
      <template slot="modal-title">인프라 구조 저장</template>
      <div class="d-block text-center">
        <label for="infra-input-live">인프라 이름:</label>
        <b-form-input
          id="infra-input-live"
          v-model="infraName"
          :state="infraNameState"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="인프라 이름 입력"
          trim
        ></b-form-input>

        <b-form-invalid-feedback id="input-live-feedback">최소 3자 이상 입력!</b-form-invalid-feedback>
      </div>
      <b-button-group style="margin-left:120px;">
        <b-button
          pill
          variant="danger"
          class="mt-3"
          @click="$bvModal.hide('bv-modal-saveInfra')"
        >Cancel</b-button>
        <b-button
          style="margin-left:100px;"
          pill
          variant="primary"
          class="mt-3"
          @click="saveInfraModal"
        >Save</b-button>
      </b-button-group>
    </b-modal>

    <!--loadInfraModal-->
    <b-modal id="bv-modal-loadInfra" hide-footer>
      <template slot="modal-title">인프라 구조 불러오기</template>
      <div class="d-block text-center">
        <b-button @click="toggleBusy">인프라 리스트 갱신</b-button>

        <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>&nbsp;&nbsp;Loading...</strong>
          </div>
        </b-table>
      </div>
      <b-button
        pill
        variant="danger"
        class="mt-3"
        @click="$bvModal.hide('bv-modal-loadInfra')"
      >Cancel</b-button>
      <b-button pill variant="primary" class="mt-3" @click="loadInfraModal">Load</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "designer",
  computed: {
    infraNameState() {
      return this.infraName.length > 3 ? true : false;
    }
    // cidrState() {
    //   return this.vmOptions[0].vm_ip.length > 14 ? true : false;
    // }
  },
  data() {
    return {
      isBusy: true,
      items: [
        { Infra_Name: "Netflix", Owner: "Hastings", Date: 40 },
        { Infra_Name: "Microsoft", Owner: "Nadella", Date: 21 },
        { Infra_Name: "Amazon", Owner: "Bezos", Date: 89 },
        { Infra_Name: "KT", Owner: "Hwang", Date: 38 }
      ],
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      infraName: "frontTest",
      vmInstances: [
        {
          x: 33,
          y: 55,
          vCount: "",
          vm_name: "Web-1",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: "",
          vmModal: "modal-0"
        },
        {
          x: 55,
          y: 100,
          vCount: "",
          vm_name: "Web-2",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: "",
          vmModal: "modal-1"
        }
      ],
      dbInstances: [
        {
          x: 133,
          y: 155,
          vCount: "",
          vm_name: "MySQL_DB",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          dbms_name: "",
          vm_ip: "",
          dbModal: "dbmodal-0"
        }
      ],
      nwInstances: [
        {
          x: 0,
          y: 1,
          nw_name: "External Subnet",
          nw_gw_cidr: "172.16.0.1/24",
          nw_type: "Routed",
          edge_gw: "ESG-Chris02",
          dns: "1.1.1.1",
          nw_static_pool: "172.16.0.2-172.16.0.254",
          nwModal: "nwmodal-0"
        }
      ],
      cpuOptions: [
        { value: null, text: "CPU 코어 선택", disabled: true },
        { value: "1", text: "1 core" },
        { value: "2", text: "2 cores" },
        { value: "4", text: "4 cores" },
        { value: "8", text: "8 cores" }
      ],
      ramOptions: [
        { value: null, text: "RAM 용량 선택", disabled: true },
        { value: "1024", text: "1GB" },
        { value: "2048", text: "2GB" },
        { value: "4096", text: "4GB" },
        { value: "8192", text: "8GB", disabled: false }
      ],
      osOptions: [
        { value: null, text: "OS 선택", disabled: true },
        { value: "ubuntu64Guest", text: "Ubuntu Server 16.04" },
        { value: "centOS64Guest", text: "CentOS 7" },
        { value: "redhat32Guest", text: "Red Hat 7.6" },
        { value: "windowsGuest", text: "Windows Server 2012", disabled: true }
      ],
      dbmsOptions: [
        { value: null, text: "DBMS 선택", disabled: true },
        { value: "mysql", text: "MySQL" },
        { value: "mongodb", text: "MongoDB" },
        { value: "postgre", text: "PostgreSQL" }
      ],
      types: [
        "VM Name",
        "password",
        "email",
        "number",
        "url",
        "tel",
        "date",
        `time`,
        "range",
        "color"
      ]
    };
  },
  methods: {
    toggleBusy: function() {
      this.isBusy = !this.isBusy;
    },
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      // inst.x = x;
      // inst.y = y;
      console.log(x + "," + y);
      console.log(this);
    },
    showCoords: function(instance) {
      instance.x = window.event.clientX - 292;
      instance.y = window.event.clientY - 80;
      // var coords = "X coords: " + a + ", Y coords: " + b;
      // console.log(coords);
    },
    testConsole: function() {
      console.log(this.dbInstances);
    },
    addVM: function() {
      // console.log(this.instancesNew);
      // this.instancesNew.push({
      //   instance: { instanceName: "test" },
      //   "instance-type": "vm-component"
      // });
      this.vmInstances.push({
        x: Math.floor(Math.random() * (300 - 1)) + 1,
        y: Math.floor(Math.random() * (300 - 1)) + 1,
        vCount: "",
        vm_name: "new",
        num_cpus: null,
        memory: null,
        disk_size: "",
        vNetwork: "",
        guest_id: null,
        vm_ip: "",
        vmModal: "modal-" + `${Math.random() * 10}`
      });
    },
    addNW: function() {
      this.nwInstances.push({
        x: Math.floor(Math.random() * (300 - 1)) + 1,
        y: Math.floor(Math.random() * (300 - 1)) + 1,
        nw_name: "",
        nw_gw_cidr: "",
        nw_type: null,
        edge_gw: null,
        dns: "",
        nw_static_pool: "",
        nwModal: "modal-" + `${Math.random() * 10}`
      });
    },
    addDB: function() {
      // console.log(this.instancesNew);
      // this.instancesNew.push({
      //   instance: { instanceName: "test" },
      //   "instance-type": "vm-component"
      // });
      this.dbInstances.push({
        x: Math.floor(Math.random() * (300 - 1)) + 1,
        y: Math.floor(Math.random() * (300 - 1)) + 1,
        vCount: "",
        vm_name: "new",
        num_cpus: null,
        memory: null,
        disk_size: "",
        vNetwork: "",
        guest_id: null,
        dbms_name: "",
        vm_ip: "",
        dbModal: "dbmodal-" + `${Math.random() * 10}`
      });
    },
    refreshPage() {
      window.location.reload();
    },
    destroyVM: function(delVM) {
      this.vmInstances.forEach(function(elem, index, object) {
        if (elem.vmModal === delVM) {
          object.splice(index, 1);
        }
      });
      console.log("the instance was deleted!");
    },
    destroyNW: function(delNW) {
      this.nwInstances.forEach(function(elem, index, object) {
        if (elem.nwModal === delNW) {
          object.splice(index, 1);
        }
      });
      console.log("the instance was deleted!");
    },
    destroyDB: function(delDB) {
      this.dbInstances.forEach(function(elem, index, object) {
        if (elem.dbModal === delDB) {
          object.splice(index, 1);
        }
      });
      console.log("the instance was deleted!");
    },
    openModal: function(id) {
      this.$bvModal.show(id);
    },
    saveInfraModal: function() {
      this.$bvModal.hide("bv-modal-saveInfra");
      this.saveInfra();
    },

    saveInfra: function() {
      this.$http
        .post("/api/terraform/save", {
          //axios 사용
          infraName: this.infraName,
          vmInstances: this.vmInstances,
          nwInstances: this.nwInstances,
          dbInstances: this.dbInstances
        })
        .then(res => {
          // console.log(this);

          // alert(res.data.testName + '를 실행합니다! ' + this.vmOptions.vmName+' VM을 생성중...');
          alert(res);
        })
        .catch(error => {
          // alert(error);
          // console.log(this);
          alert(error);
        });
    },
    loadInfraModal: function() {},
    loadInfra: function() {
      this.$http
        .get("/api/terraform/load")
        .then(res => {
          console.log(res.data);
          this.vmInstances = res.data;
          // this.vmInstances = res;
        })
        .catch(err => {
          alert(err);
        });
      console.log(this.vmInstances);
    }
  }
};
</script>
