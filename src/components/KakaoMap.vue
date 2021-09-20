<template>
    <div id="kakaomap">
    </div>
</template>

<script>
import KakaoMapController from '../module/kakaoMap.controller'
export default {
    name: 'KakaoMap',
    data () {
        return {
            kakaoMapInstance: null
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController('#kakaomap')
        this.kakaoMapInstance.initMap()
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
    top: 0;
}
</style>
