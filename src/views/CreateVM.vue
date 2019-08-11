<template>

  <div class="main-content">

    <div class="main-content__top">
        <h1 class="main-content__title">
            Select VM options and run terraform scripts
        </h1>
    </div>

    <div class="main-content__body">
      <p>
        아래의 VM 설정값을 입력하고 버튼을 누르면 terraform 스크립트가 실행됩니다!
      </p>
      <br>
      <!--bootstrap-vue -->
      <b-container fluid>
        <!-- <b-row class="my-1" v-for="type in types" :key="type">
          <b-col sm="3">
            <label :for="`type-${type}`">Type {{ type }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
          </b-col>
        </b-row> -->
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-text`">VM 갯수 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.vCount" :id="`type-text`" :type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-text`">VM 이름 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.vm_name" :id="`type-text`" :type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-range`">CPU 코어 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="vmOptions.num_cpus" :options="cpuOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-range`">RAM 용량 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="vmOptions.memory" :options="ramOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-text`">VM 디스크 용량 (GB) :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.disk_size" :id="`type-text`" :type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-range`">OS :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="vmOptions.guest_id" :options="osOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="vm-netowrk">네트워크 이름 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.vNetwork" :id="vm-netowrk" :type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="vm-ip">IPv4 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.vm_ip" :id="vm-ip" :type="text" :state="cidrState" aria-describedby="vm-ip-feedback" placeholder="CIDR 형식"></b-form-input>
            <b-form-invalid-feedback id="vm-ip-feedback">
      172.0.0.1/24와 같은 형식으로 입력!
    </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <div id="terraform_execute" style="margin-left:365px;margin-top:30px;" >
        <!--condition check for all options were selected!-->
          <b-button pill variant="danger" v-on:click="refreshPage" style="margin-right:15px">Cancel</b-button>
          <b-button pill variant="info" v-on:click="runSave" style="margin-right:15px">Save</b-button>
          <b-button pill variant="primary" v-on:click="runTerra">Run Terraform</b-button>
        </div>
      </b-container>

      
    </div>
  </div>

</template>

<script>

export default {
  name: 'create-vm',

  computed: {
      cidrState() {
        return this.vmOptions.vm_ip.length > 14 ? true : false
      }
    },
  data(){
    return {
      name: 'Terraform 스크립트',
      cpuOptions: [
          { value: null, text: 'CPU 코어 선택', disabled: true },
          { value: '1', text: '1 core' },
          { value: '2', text: '2 cores' },
          { value: '4', text: '4 cores' },
          { value: '8', text: '8 cores'}
        ],
      ramOptions: [
          { value: null, text: 'RAM 용량 선택', disabled: true },
          { value: '1024', text: '1GB' },
          { value: '2048', text: '2GB' },
          { value: '4096', text: '4GB' },
          { value: '8192', text: '8GB', disabled: false }
        ],
      osOptions: [
        { value: null, text: 'OS 선택', disabled: true },
          { value: 'ubuntu64Guest', text: 'Ubuntu Server 16.04' },
          { value: 'centOS64Guest', text: 'CentOS 7' },
          { value: 'redhat32Guest', text: 'Red Hat 7.6' },
          { value: 'windowsGuest', text: 'Windows Server 2012', disabled: true }
      ],
      types: [
          'VM Name',
          'password',
          'email',
          'number',
          'url',
          'tel',
          'date',
          `time`,
          'range',
          'color'
      ],
      vmOptions: {
          vCount: "",
          vm_name: "",
          num_cpus: null,
          memory: null,
          disk_size: "",
          vNetwork: "",
          guest_id: null,
          vm_ip: ""
      },
    }
  },

  methods: {
    refreshPage() {
      window.location.reload();
    },
    makeErrorToast(err) {

        this.$bvToast.toast(err, {
          title: '서버 오류 발생',
          variant: 'danger',
          solid: true,
          noAutoHide : true,
        })
      },

      popSuccessToast(msg) {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        // this.count++
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: {variant: 'success', type: 'grow', small: true } }),
            `${msg} `,
            // h('strong', {}, 'VM을 만드는 중...'),
            // h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        // Create the title
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, 'VM 생성 완료'),
            // h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
          ]
        )
        // Pass the vNodes as an array for message and title
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'success',
          autoHideDelay: 10000,
          // noAutoHide : true,
        })
      },

      popErrToast(err) {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        // this.count++
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: {variant: 'danger', type: 'grow', small: true } }),
            `${err} `,
            // h('strong', {}, 'VM을 만드는 중...'),
            // h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        // Create the title
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, '서버 오류 발생'),
            // h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
          ]
        )
        // Pass the vNodes as an array for message and title
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'danger',
          noAutoHide : true,
        })
      },
    popToast() {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        // this.count++
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: { small: true } }),
            ' 열심히 ',
            `${this.vmOptions.vmName}`,
            h('strong', {}, ' VM을 만드는 중...'),
            // h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        // Create the title
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, 'VM 생성중'),
            // h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
          ]
        )
        // Pass the vNodes as an array for message and title
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'info',
          autoHideDelay: 10000,
          //noAutoHide: true
        })
      },

    runSave() {
      this.popSuccessToast('구성 환경 저장 완료!');
    },

    runTerra(event) {
      /**
       * send vsphere vm options to back-end server
       * 
       * -- run terraform script --
       * 
       * terraform init (skippable)
       * 
       * load web's vm options into variables.tf
       * 
       * terraform apply -auto-approve
       * 
       * del /q terraform.tfstate
       */
      this.popToast();

      console.log(this.vmOptions);
      //var current = this; use arrow function instead
      this.$http.post('/api/terraform', { //axios 사용
        vmOptions: this.vmOptions
      })
      .then((res) => {
        // console.log(this);

        // alert(res.data.testName + '를 실행합니다! ' + this.vmOptions.vmName+' VM을 생성중...');
        this.popSuccessToast(res.data.testName);
      })
      .catch((error) => {
        // alert(error);
        // console.log(this);
        this.popErrToast(`${error}`);
      });
    // this.makeErrorToast();
    // this.$http.get(`https://jsonplaceholder.typicode.com/posts/42`)
    //   .then((result) => {
    //     console.log(result);
    //     // this.posts = result.data
    //   });
      if(event) {
        // alert(event.target.tagName);
      }
  
      },

  }
}

// new Vue({
//     el: '...',
//     data: {
//         vCPU: ''
//     }
// })

// var terraform_execute = new Vue({
//   el: '#terraform_execute',
//   data: {
//     name: 'Terraform'
//   },
//   methods: {
//     runTerra: function(event) {
//       alert(this.name + '을 실행합니다!');
      
//     //   if(event) {
//     //     alert(event.target.tagName);
//     //   }

//     }
//   }
// })

</script>
