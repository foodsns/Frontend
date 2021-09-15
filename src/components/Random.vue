<template>
    <div>
        <b-button class = "random-btn" pill variant="outline-danger" v-on:click="greet">랜덤선택</b-button>
    </div>
</template>

<script>
export default {
    name: 'random-btn',
    methods: {
      onViewModeChanged: function (mode) {
        console.log(`[MainBoard] [onViewModeChanged] mode: ${mode}`)
      },
      greet: function (event) {
        /// TODO: https://bootstrap-vue.org/docs/components/modal
        alert('랜덤 결과 창')
      }
  }
    
}
</script>

<style>
.random-btn{
  position : fixed;
  bottom : 30px;
  right : 30px;
  width : 90px;
  height : 90px;
  border-radius : 100px;
}
</style>
