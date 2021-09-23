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
            <button id="setmarker" v-on:click="setMarker(postList)"></button>
            <button id="appendMarker" v-on:click="appendMarker"></button>
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
        },
        postListProps: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    watch: {
        postList: function (val) {
            this.setMarker(val)
        }
    },
    data () {
        return {
            kakaoMapInstance: null,
            postList: this.postListProps,
            lv: 0,
            lat: 0,
            lot: 0
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController(this.$refs.kakaomap)
        this.initKakaoMap()
        .then(() => {
            this.kakaoMapInstance.initMap()
            this.getMapInfo()
            if (!this.dev) {
                this.setMarker(this.postList)
            }
            this.kakaoMapInstance.kakao.maps.event.addListener(this.kakaoMapInstance.map, 'center_changed', () => {
                this.getMapInfo()
                console.log(`[KakaoMap] [mounted] center changed ${this.lv}, ${this.lat}, ${this.lot}`)
            })
        })
        .catch(err => {
            console.log(`[KakaoMap] [mounted] Cannot load kakao map script: ${err.message}`)
        })
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
        },
        setMarker (array) {
            this.kakaoMapInstance.setMarkerList(array.map(item => {
                return {
                    lat: item.lat,
                    lot: item.lot
                }
            }))
        },
        appendMarker () {
            this.postList.push(
                {
                    title: '주한 엘살바도르 대사관 Embajada de el salvador',
                    descript: '서울특별시 중구 태평로2가 세종대로 55',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 9,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipPqYD7cZFNuMYbqU8gDjll0fnLOsKL1x9Ep2d-9=w408-h544-k-no',
                    lat: 37.5616465,
                    lot: 126.9728315
                })
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
