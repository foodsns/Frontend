<template>
    <div>
      <b-button v-b-tooltip.hover.topright.v-secondary title="음식점 랜덤선택"
      placement = "bottom"
        class = "random-btn"
        pill variant="outline-secondary"
        @click="showRandomdModal()"
        id = "randomBtn">
        <font-awesome-icon icon="dice" style="margin-right: 5px"/>
      </b-button>
    </div>
</template>

<script>
export default {
  methods: {
    showRandomdModal: function () {
        this.$bvModal.msgBoxConfirm('랜덤결과 창입니다.', {
          title: ' ',
          hideHeaderClose: false
        })
      }
  }
}
</script>

<style>
.random-btn{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
