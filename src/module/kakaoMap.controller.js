export default class KakaoMapController {
    kakao = null
    mapContainer = null

    constructor (mapEleId) {
        this.kakao = window.kakao
        this.mapContainer = document.querySelector(mapEleId)
    }

    initMap () {
        const options = {
            center: new this.kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
            level: 3
        }
        const map = new this.kakao.maps.Map(this.mapContainer, options)
        const markerPosition = new this.kakao.maps.LatLng(35.19656853772262, 129.0807270648317)

        const marker = new this.kakao.maps.Marker({
            position: markerPosition
        })
        marker.setMap(map)
    }
}
