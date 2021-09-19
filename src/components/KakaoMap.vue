<template>
    <div id="kakaomap">
    </div>
</template>

<script>
var kakao = window.kakao
export default {
    name: 'KakaoMap',
    data () {
        return {
        }
    },
    mounted () {
        if (kakao) {
            console.log('map init')
            this.initMap()
        }
    },
    methods: {
        initMap () {
            const container = document.querySelector('#kakaomap')
            const options = {
                center: new kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
                level: 3
            }
            const map = new kakao.maps.Map(container, options)
            const markerPosition = new kakao.maps.LatLng(35.19656853772262, 129.0807270648317)

            const marker = new kakao.maps.Marker({
                position: markerPosition
            })
            marker.setMap(map)
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
