<template>
    <span class = "userGps">
        <b-button pill variant="outline-secondary" @click="onLocationLoaderClicked()" :disabled="processing"><font-awesome-icon icon="map-marker-alt"/></b-button>
        <div ref="hiddenMap"></div>
    </span>
</template>

<script>
import KakaoMapController from '../module/kakaoMap.controller'
export default {
    name: 'userGps',
    data () {
        return {
            processing: true,
            kakaoMapInstance: null
        }
    },
    mounted () {
        this.kakaoMapInstance = new KakaoMapController(this.$refs.hiddenMap)
        this.kakaoMapInstance.loadScript()
        .then(() => {
            this.kakaoMapInstance.initMap()
            this.$nextTick(() => {
                this.processing = false
            })
        })
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
            this.processing = true
            this.getLocation()
            .then(latLot => this.kakaoMapInstance.latLot2Addr(latLot.lat, latLot.lot))
            .then(data => {
                this.$emit('location', {
                    addr1: this.addr1,
                    addr2: this.addr2,
                    addr3: this.addr3,
                    lat: this.lat,
                    lot: this.lot
                })
                this.$nextTick(() => {
                    this.processing = false
                })
            })
            .catch(err => {
                console.error('[userGps] [onLocationLoaderClicked] Error', err)
                this.$emit('err-msg', err.message)
            })
        }
    }
}
</script>
