<template>
    <div>
        <div id="kakaomap" ref="kakaomap"></div>
        <div>
            <span id="lv">{{ lv }}</span>
            <span id="lat">{{ lat }}</span>
            <span id="lot">{{ lot }}</span>
            <button id="zoomin" v-on:click="zoomIn"></button>
            <button id="zoomout" v-on:click="zoomOut"></button>
            <button id="move" v-on:click="move"></button>
        </div>
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
            kakaoMapInstance: null,
            lv: 0,
            lat: 0,
            lot: 0
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController(this.$refs.kakaomap)
        if (!this.dev) {
            this.initKakaoMap()
            .then(() => {
                this.kakaoMapInstance.initMap()
                this.getMapInfo()

                this.kakaoMapInstance.kakao.maps.event.addListener(this.kakaoMapInstance.map, 'center_changed', () => {
                    this.getMapInfo()
                })
            })
            .catch(err => {
                console.log(`[KakaoMap] [mounted] Cannot load kakao map script: ${err.message}`)
            })
        }
    },
    methods: {
        initKakaoMap () {
            return this.kakaoMapInstance.loadScript()
        },
        getMapInfo () {
            this.lv = this.kakaoMapInstance.map.getLevel()
            this.lat = this.kakaoMapInstance.map.getCenter().getLat()
            this.lot = this.kakaoMapInstance.map.getCenter().getLng()
        },
        zoomIn () {
            this.kakaoMapInstance.setZoom(this.lv--)
        },
        zoomOut () {
            this.kakaoMapInstance.setZoom(this.lv++)
        },
        move () {
            this.kakaoMapInstance.moveCenter(37.5662952, 126.9757511)
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
