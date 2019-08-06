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
      <span>VM 이름: {{vmName}}</span>
      <input v-model="vmName" placeholder="vm의 이름">
      
      <br>
      <span>CPU 코어: {{vCPU}}</span>
      <select v-model="vCPU">
          <option>1</option>
          <option>2</option>
          <option>4</option>
      </select>
      <br>
      <span>RAM 용량: {{vRAM}}</span>
      <select v-model="vRAM">
          <option>1GB</option>
          <option>2GB</option>
          <option>4GB</option>
      </select>
      <span>네트워크: {{vNetwork}}</span>
      <select v-model="vNetwork">
          <option>VM네트워크</option>
          <option>CIP Portgroup</option>
          <option>4GB</option>
      </select>
      <br>
      <br>
      <div id="terraform_execute">
          <button v-on:click="runTerra">Run Terraform</button>
      </div>
    </div>

  </div>

</template>

<script>

export default {
  name: 'create-vm',
  var terraform_execute = new Vue({
    el: '#terraform_execute',
    data: {
      name: 'Terraform'
    },
    methods: {
      runTerra: function(event) {
        alert(this.name + '을 실행합니다!');
        
        // if(event) {
        //   alert(event.target.tagName);
        // }
  
      }
    }
  })
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
