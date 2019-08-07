<template>
  <div>
    <h1>상세 내용</h1>
    
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/movies/${id}`)
    .then((response) => {
        /* eslint-disable */

      this.movie = response.data;
      console.log(response.data);
    })
  },
  data: function () {
    return {
      movie: {}
    }
  }
}
</script>