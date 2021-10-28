<template>
    <div>
      <b-button class = "random-btn" pill variant="outline-secondary" v-b-modal = "'random-modal'">
        <font-awesome-icon icon="dice" style="margin-right: 5px"/>
      </b-button>
      <b-modal id="random-modal">랜덤결과 창입니다.</b-modal>
    </div>
</template>

<script>
</script>

<style>
.random-btn{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
