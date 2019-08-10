<template>

  <div class="main-content">

    <div class="main-content__top">
        <h1 class="main-content__title">
            Select VM options and make terraform scripts
        </h1>
    </div>

    <div class="main-content__body">
      <p>
        아래의 VM 설정들을 마치고 버튼을 누르면 terraform 스크립트가 실행됩니다!
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
            <label :for="`type-text`">VM Name :</label>
          </b-col>
          <b-col sm="2">
            <b-form-input v-model="vmOptions.vmName" :id="`type-text`" :type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-range`">CPU 코어 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="vmOptions.vCPU" :options="cpuOptions"></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
        <b-col sm="3">
            <label :for="`type-range`">RAM 용량 :</label>
          </b-col>
          <b-col sm="2">
            <b-form-select v-model="vmOptions.vRAM" :options="ramOptions"></b-form-select>
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
            <b-form-input v-model="vmOptions.vIP" :id="vm-ip" :type="text" :state="cidrState" aria-describedby="vm-ip-feedback" placeholder="CIDR 형식"></b-form-input>
            <b-form-invalid-feedback id="vm-ip-feedback">
      172.0.0.1/24와 같은 형식으로 입력!
    </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <div id="terraform_execute">
        <!--condition check for all options were selected!-->
          <b-button pill variant="primary" v-on:click="runTerra">Run Terraform</b-button>
      </div>
      </b-container>

      <!-- <span>VM 이름:</span>
      <b-form-input v-model="vmOptions.vmName" placeholder="vm의 이름"></b-form-input>
      <input v-model="vmOptions.vmName" placeholder="">
      
      <br>
      <span>CPU 코어:</span>
      <select v-model="vmOptions.vCPU">
          <option>1</option>
          <option>2</option>
          <option>4</option>
      </select>
      <br>
      <span>RAM 용량:</span>
      <select v-model="vmOptions.vRAM">
          <option>1GB</option>
          <option>2GB</option>
          <option>4GB</option>
      </select>
      <br>
      <span>네트워크:</span>
      <select v-model="vmOptions.vNetwork">
          <option>VM Network</option>
          <option>CIP Portgroup</option>
      </select>
      <br>
      <span>GuestOS ID:</span>
      <select v-model="vmOptions.guest_id">
          <option>ubuntu64Guest</option>
          <option>centOS64Guest</option>
          <option>redhat32Guest</option>
          <option>windowsGuest</option>
      </select>
      <br> -->
      
    </div>
  </div>

</template>

<script>

export default {
  name: 'create-vm',

  computed: {
      cidrState() {
        return this.vmOptions.vIP.length > 14 ? true : false
      }
    },
  data(){
    return {
      name: 'Terraform 스크립트',
      cpuOptions: [
          { value: null, text: 'CPU 코어 선택' },
          { value: '1', text: '1 core' },
          { value: '2', text: '2 cores' },
          { value: '4', text: '4 cores' },
          { value: '8', text: '8 cores'}
        ],
      ramOptions: [
          { value: null, text: 'RAM 용량 선택' },
          { value: '1024', text: '1GB' },
          { value: '2048', text: '2GB' },
          { value: '4096', text: '4GB' },
          { value: '8192', text: '8GB', disabled: false }
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
          vmName: "",
          vCPU: "",
          vRAM: "",
          vNetwork: "",
          guest_id: "",
          vIP: ""
      },
    }
  },

  methods: {
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
          noAutoHide : true,
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
          noAutoHide: true
        })
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
      // this.makeErrorToast('test');
      
      var current = this;
      this.$http.post('/api/terraform', { //axios 사용
        vmOptions: this.vmOptions
      })
      .then((res) => {
        //console.log(res);
        console.log(this);

        // alert(res.data.testName + '를 실행합니다! ' + this.vmOptions.vmName+' VM을 생성중...');
        this.popErrToast(res.data.testName);
      })
      .catch(function (error) {
        // alert(error);
        // console.log(this);
        current.popSuccessToast(`${error}`);
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
