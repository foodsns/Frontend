<template>
  <div id="postbox">
    <img />
    <div>
        <h3></h3>
        <pre></pre>
        <div></div>
        <hr>
        <div>
            <img />
            <span>by <span>stories2</span></span>
            <font-awesome-icon icon="heart" />
            <span>105</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postbox',
  data () {
    return {
        msg: 'post box component'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
