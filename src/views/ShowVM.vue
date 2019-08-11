<template>

  <div class="main-content">

    <div class="main-content__top">
        <h1 class="main-content__title">
            List all VMs
        </h1>
    </div>

    <div class="main-content__body">
      <p>
        현재 vSphere의 VM들
      </p>
      <br>
      <div>
        <b-table striped hover :items="vmList"></b-table>
        <!-- <p>VM 총 갯수: {{ vmList.length }}</p> -->
      </div>
      <div id="terraform_execute">
        <!--condition check for all options were selected!-->
          <button v-on:click="showVMs">VM 조회</button>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'show-vm',

  data(){
    return {
      // name: 'Terraform 스크립트',
      vmList: [
        {
            "memory_size_MiB": 2048,
            "vm": "vm-102",
            "name": "InternProject-Web1",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        },
        {
            "memory_size_MiB": 2048,
            "vm": "vm-103",
            "name": "InternProject-Web2",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        },
        {
            "memory_size_MiB": 2048,
            "vm": "vm-104",
            "name": "InternProject-DB",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        },
        {
            "memory_size_MiB": 1024,
            "vm": "vm-117",
            "name": "testName123",
            "power_state": "POWERED_ON",
            "cpu_count": 1
        },
        {
            "memory_size_MiB": 4096,
            "vm": "vm-12",
            "name": "On-Prem DC",
            "power_state": "POWERED_ON",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 16384,
            "vm": "vm-13",
            "name": "vcsa",
            "power_state": "POWERED_ON",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 4096,
            "vm": "vm-15",
            "name": "vCAV-OnPremise",
            "power_state": "POWERED_OFF",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 4096,
            "vm": "vm-19",
            "name": "Test-VM-Win-jLaF",
            "power_state": "POWERED_OFF",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 4096,
            "vm": "vm-24",
            "name": "VMware-vCloud-Availability-OnPrem",
            "power_state": "POWERED_ON",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 2048,
            "vm": "vm-30",
            "name": "(CentOS)On Premise 01 50G",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        },
        {
            "memory_size_MiB": 2048,
            "vm": "vm-31",
            "name": "(CentOS)On Premise 02 50G",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        },
        {
            "memory_size_MiB": 32,
            "vm": "vm-38",
            "name": "%2fvmfs%2fvolumes%2f5cece620-96843c28-322d-1402ec8c0e50%2fNew Virtual Machine%2f",
            "power_state": "POWERED_OFF",
            "cpu_count": 1
        },
        {
            "memory_size_MiB": 32,
            "vm": "vm-40",
            "name": "%2fvmfs%2fvolumes%2f5cece620-96843c28-322d-1402ec8c0e50%2fMig Mob 3%2fMig Mob 3.",
            "power_state": "POWERED_OFF",
            "cpu_count": 1
        },
        {
            "memory_size_MiB": 8192,
            "vm": "vm-41",
            "name": "Mig Mob 04",
            "power_state": "POWERED_ON",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 8192,
            "vm": "vm-43",
            "name": "Mig Mob 05",
            "power_state": "POWERED_OFF",
            "cpu_count": 4
        },
        {
            "memory_size_MiB": 2048,
            "vm": "vm-72",
            "name": "InternProject-ReverseProxy",
            "power_state": "POWERED_ON",
            "cpu_count": 2
        }
      ],

    }
  },

  methods: {
    showVMs() {
      // alert('test');
    }
    
  },

  created: function () {
    // var id = this.$route.params.id
    this.$http.get(`/api/movies/1`)
    .then((response) => {
        /* eslint-disable */

      this.vmList += response.data[0];
      console.log(this.vmList);
    })
    .then(() => {
      // <b-table striped hover :items="vmList"></b-table>             h('b-spinner', { props: { small: true } }),
      const h = this.$createElement
      var node = h('b-table');
      console.log(node);
    });
  },

}
</script>
