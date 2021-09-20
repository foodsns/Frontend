<template>
    <div>
        <b-button class = "random-btn" pill variant="outline-danger" v-b-modal = "'random-modal'">랜덤선택</b-button>
        <b-modal id="random-modal">랜덤결과 창입니다.</b-modal>
    </div>
</template>

<script>
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
