<template>

  <div class="main-content">

    <div class="main-content__top">
        <h1 class="main-content__title">
            VMware Automation Tool Prototype
        </h1>
    </div>

    <div class="main-content__body">
      <b-img src="https://s3.ap-northeast-2.amazonaws.com/com.mymentormenteeimage/LOGO.png" fluid alt="Responsive image"></b-img>

     <p style="margin-left:120px;">
        
        Terraform을 이용한 VMware 자동화 툴 프로토타입 시연
      </p>
     


      <!-- <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="10000"
      controls
      indicators
      background="#ababab"
      img-width="680"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
   
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="https://picsum.photos/1024/480/?image=55"
          alt="image slot"
        >
      </b-carousel-slide>
    </b-carousel> -->


    </div>

  </div>

</template>

<script>

export default {
  name: 'home',
  data() {
      return {
        // slide: 0,
        // sliding: null
      }
    },
    methods: {
      // onSlideStart(slide) {
      //   this.sliding = true
      // },
      // onSlideEnd(slide) {
      //   this.sliding = false
      // }
    }
}

</script>
