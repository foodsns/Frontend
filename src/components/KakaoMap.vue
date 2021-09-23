<template>
    <div id="kakaomap" ref="kakaomap">
    </div>
</template>

<script>
import KakaoMapController from '../module/kakaoMap.controller'
export default {
    name: 'KakaoMap',
    props: {
        dev: {
            type: Boolean,
            default: function () {
                return false
            }
        }
    },
    data () {
        return {
            kakaoMapInstance: null
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController(this.$refs.kakaomap)
        if (!this.dev) {
            this.initKakaoMap()
            .then(() => {
                this.kakaoMapInstance.initMap()
            })
            .catch(err => {
                console.log(`[KakaoMap] [mounted] Cannot load kakao map script: ${err.message}`)
            })
        }
    },
    methods: {
        initKakaoMap () {
            return this.kakaoMapInstance.loadScript()
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
    top: 0;
}
</style>
