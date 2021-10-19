<template>
    <span class = "userGps">
        <b-button pill variant="outline-secondary" @click="onLocationLoaderClicked()"><font-awesome-icon icon="map-marker-alt"/></b-button>
        <div ref="hiddenMap"></div>
    </span>
</template>

<script>
import KakaoMapController from '../module/kakaoMap.controller'
export default {
    name: 'userGps',
    data () {
        return {
            addr1: '',
            addr2: '',
            addr3: '',
            lat: 0,
            lot: 0,
            msg: '',
            kakaoMapInstance: null
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController(this.$refs.hiddenMap)
        this.kakaoMapInstance.loadScript()
        .then(() => this.kakaoMapInstance.initMap())
    },
    methods: {
        getLocation: function () {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lot: position.coords.longitude
                        })
                    }, (error) => {
                        reject(error)
                    })
                } else {
                    reject(new Error('GPS not supported'))
                }
            })
        },
        onLocationLoaderClicked: function () {
            this.getLocation()
            .then(latLot => this.kakaoMapInstance.latLot2Addr(latLot.lat, latLot.lot))
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.error('err', err)
            })
        }
    }
}
</script>
