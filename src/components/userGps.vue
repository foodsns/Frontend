<template>
    <span class = "userGps">
        <b-button
            v-intro ="'내 현재위치를 불러올 수 있어요.'"
            pill variant="outline-secondary" @click="onLocationLoaderClicked()" :disabled="processing"><font-awesome-icon icon="map-marker-alt"/></b-button>
        <div ref="hiddenMap" style="display:none"></div>
    </span>
</template>

<script>
import Vue from 'vue'
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

                const lastAddr = localStorage.getItem('addr')
                const queryAddr = Vue.prototype.$queryAddr
                if (this.$route.query.address && queryAddr !== this.$route.query.address) {
                    this.getLatLotUsingAddr(this.$route.query.address)
                    Vue.prototype.$queryAddr = this.$route.query.address
                } else if (lastAddr) {
                    this.getLatLotUsingAddr(lastAddr)
                }
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
            let lat = 0
            let lot = 0
            this.getLocation()
            .then(latLot => {
                lat = latLot.lat
                lot = latLot.lot
                return this.kakaoMapInstance.latLot2Addr(latLot.lat, latLot.lot)
            })
            .then(data => {
                this.$emit('location', {
                    addr1: data.region_1depth_name,
                    addr2: data.region_2depth_name,
                    addr3: data.region_3depth_name,
                    lat,
                    lot
                })
                this.saveLastLoadedAddr(`${data.region_1depth_name} ${data.region_2depth_name} ${data.region_3depth_name}`)
                this.$nextTick(() => {
                    this.processing = false
                })
                this.$emit('err-msg', null)
            })
            .catch(err => {
                console.error('[userGps] [onLocationLoaderClicked] Error', err)
                this.$emit('err-msg', err.message)
            })
        },
        getLatLotUsingAddr: function (addr) {
            this.processing = true
            let lat = 0
            let lot = 0
            this.kakaoMapInstance.addr2LatLot(addr)
            .then(data => {
                lat = data.lat
                lot = data.lot
                return this.kakaoMapInstance.latLot2Addr(data.lat, data.lot)
            })
            .then(data => {
                this.$emit('location', {
                    addr1: data.region_1depth_name,
                    addr2: data.region_2depth_name,
                    addr3: data.region_3depth_name,
                    lat,
                    lot
                })
                this.saveLastLoadedAddr(`${data.region_1depth_name} ${data.region_2depth_name} ${data.region_3depth_name}`)
                this.$nextTick(() => {
                    this.processing = false
                })
                this.$emit('err-msg', null)
            })
            .catch(err => {
                console.error('[userGps] [onLocationLoaderClicked] Error', err)
                this.$emit('err-msg', err.message)
            })
        },
        saveLastLoadedAddr: function (addr) {
            localStorage.setItem('addr', addr)
        }
    }
}
</script>
