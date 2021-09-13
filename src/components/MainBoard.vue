<template>
  <div id="mainboard">
    <h1>{{ msg }}</h1>
    <post-box v-bind:post="post"></post-box>
  </div>
</template>

<script>
export default {
  name: 'MainBoard',
  data () {
    return {
        msg: 'hello world',
        post: {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
