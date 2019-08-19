<template>
  <div class="main-content">
    <div class="main-content__top">
      <h1 class="main-content__title">VMware Automation Tool Designer</h1>
    </div>

    <div class="main-content__body">
      <div style="height: 450px; width: 700px; border: 2px solid black; position: relative;">
        <vue-draggable-resizable
          v-for="(inst, index) in vmInstancesNewTest"
          :key="index"
          :x="inst.x"
          :y="inst.y"
          :w="74"
          :h="105"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
        >
          <img
            v-on:dblclick="destroyVM(inst.vmModal)"
            width="70px"
            src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/vm-icon-small.png"
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
          v-for="(inst, index) in dbInstances"
          :key="index"
          :x="inst.x"
          :y="inst.y"
          :w="72"
          :h="105"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
          :resizable="false"
        >
          <img
            width="70px"
            src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/database-icon.png"
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
          <!-- <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p> -->
        </vue-draggable-resizable>
      </div>
      <div id="terraform_execute" style="margin-left:580px;margin-top:20px; margin-bottom:30px;">
        <!--condition check for all options were selected!-->
        <b-button pill variant="danger" v-on:click="refreshPage" style="margin-right:15px">Cancel</b-button>
        <b-button pill variant="info" v-on:click="loadInfra" style="margin-right:15px">Load</b-button>
        <b-button pill variant="info" v-on:click="saveInfra" style="margin-right:15px">Save</b-button>
        <b-button pill variant="primary" v-on:click="runTerra">Run Terraform</b-button>
      </div>

      <div
        style="float:right; margin-right:10px; margin-top:-540px; height: 450px; width: 200px; border: 2px solid black; position: relative;"
      >
        <b-button pill variant="primary" v-on:click="addVM" style="margin-bottom:10px">Add VM</b-button>
        <b-button pill variant="info" v-on:click="addNetwork" style="margin-bottom:10px">Add Network</b-button>
        <b-button pill variant v-on:click="addDB" style="margin-bottom:10px">Add DB</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "designer",
  computed: {
    // cidrState() {
    //   return this.vmOptions[0].vm_ip.length > 14 ? true : false;
    // }
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      vmInstancesNewTest: [
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
      // instanceNum: 3,
      // instances: [
      //   {
      //     x: 100,
      //     y: 80,
      //     vmIndex: 0
      //   },
      //   {
      //     x: 200,
      //     y: 80,
      //     vmIndex: 1
      //   },
      //   {
      //     x: 150,
      //     y: 220,
      //     vmIndex: 2
      //   }
      // ],
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
      // vmOptions: [
      //   {
      //     vCount: "",
      //     vm_name: "",
      //     num_cpus: null,
      //     memory: null,
      //     disk_size: "",
      //     vNetwork: "",
      //     guest_id: null,
      //     vm_ip: ""
      //   },
      //   {
      //     vCount: "",
      //     vm_name: "",
      //     num_cpus: null,
      //     memory: null,
      //     disk_size: "",
      //     vNetwork: "",
      //     guest_id: null,
      //     vm_ip: ""
      //   }
      // ]
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
      // inst.x = x;
      // inst.y = y;
      console.log(x + "," + y);
      console.log(this);
    },
    testConsole: function() {
      // this.vmInstancesNewTest = [
      //   {
      //     x: 333,
      //     y: 55,
      //     vCount: "",
      //     vm_name: "123Web-1",
      //     num_cpus: null,
      //     memory: null,
      //     disk_size: "",
      //     vNetwork: "",
      //     guest_id: null,
      //     vm_ip: "",
      //     vmModal: "modal-0"
      //   },
      //   {
      //     x: 55,
      //     y: 300,
      //     vCount: "",
      //     vm_name: "321Web-2",
      //     num_cpus: null,
      //     memory: null,
      //     disk_size: "",
      //     vNetwork: "",
      //     guest_id: null,
      //     vm_ip: "",
      //     vmModal: "modal-1"
      //   }
      // ];
      console.log(this.vmInstancesNewTest);
    },
    addVM: function() {
      // console.log(this.instancesNew);
      // this.instancesNew.push({
      //   instance: { instanceName: "test" },
      //   "instance-type": "vm-component"
      // });
      this.vmInstancesNewTest.push({
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
      this.vmInstancesNewTest.forEach(function(elem, index, object) {
        if (elem.vmModal === delVM) {
          object.splice(index, 1);
        }
      });
      console.log("the instance was deleted!");
    },
    destroyDB: function(delDB) {
      console.log(delDB);
    },
    saveInfra: function() {
      this.$http
        .post("/api/terraform/save", {
          //axios 사용
          vmInstances: this.vmInstancesNewTest,
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
    loadInfra: function() {
      this.$http
        .get("/api/terraform/load")
        .then(res => {
          console.log(res.data);
          this.vmInstancesNewTest = res.data;
          // this.vmInstancesNewTest = res;
        })
        .catch(err => {
          alert(err);
        });
      console.log(this.vmInstancesNewTest);
    }
  }
};
</script>
