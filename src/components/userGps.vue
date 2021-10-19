<template>
    <span class = "userGps">
        <b-button pill variant="outline-secondary" @click="onLocationLoaderClicked()" :disabled="processing"><font-awesome-icon icon="map-marker-alt"/></b-button>
        <div ref="hiddenMap" style="display:none"></div>
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
                    addr1: data.region_1depth_name,
                    addr2: data.region_2depth_name,
                    addr3: data.region_3depth_name,
                    lat: data.y,
                    lot: data.x
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
