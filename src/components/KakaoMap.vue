<template>
    <div id="kakaomap">
    </div>
</template>

<script>
export default {
    name: 'KakaoMap',
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#kakaomap {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: antiquewhite;
    z-index: -200;
    top: 0;
}
</style>
