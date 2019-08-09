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
      <span>VM 이름:</span>
      <b-form-input v-model="vmOptions.vmName" placeholder="vm의 이름"></b-form-input>
      <!--input v-model="vmOptions.vmName" placeholder=""-->
      
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
      <br>
      <div id="terraform_execute">
        <!--condition check for all options were selected!-->
          <button v-on:click="runTerra">Run Terraform</button>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'create-vm',

  data(){
    return {
      name: 'Terraform 스크립트',
      vmOptions: {
          vmName: "",
          vCPU: "",
          vRAM: "",
          vNetwork: "",
          guest_id: ""
      },

    }
  },

  methods: {

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

      this.$http.post('/api/terraform', { //axios 사용
        vmOptions: this.vmOptions
      })
      .then((res) => {
        console.log(res);
        alert(res.data.testName + '를 실행합니다! ' + this.vmOptions.vmName+' VM을 생성중...');
        // if (response.data.result === 0) {
        //   alert('Error, please, try again')
        // }
        // if (response.data.result === 1) {
        //   alert('Success')
          // this.$router.push('/login') // Login 페이지로 보내줌
      })
      .catch(function (error) {
        alert(error);
      });
    
    // this.$http.get(`https://jsonplaceholder.typicode.com/posts/42`)
    //   .then((result) => {
    //     console.log(result);
    //     // this.posts = result.data
    //   });
  

      
      
      if(event) {
        // alert(event.target.tagName);
      }
  
      }
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
