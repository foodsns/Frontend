export default class KakaoMapController {
    kakao = null
    mapContainer = null
    map = null
    customOverlayList = []
    markerList = []

    constructor (mapEle) {
        this.mapContainer = mapEle // document.querySelector(mapEleId)

        if (!this.mapContainer) {
            throw new Error(`Map container is null`)
        }
    }

    loadScript () {
        return new Promise((resolve, reject) => {
            this.kakao = window.kakao

            if (!this.kakao) {
                console.warn(`[kakaoMap.controller] [loadScript] kakao sdk not found. Load from cdn`)
                const script = document.createElement('script')
                script.onload = () => {
                    console.log(`[kakaoMap.controller] [loadScript] kakao sdk loaded successfully.`)
                    resolve()
                }
                script.onerror = () => reject(new Error(`Cannot load kakao map script`))
                script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4430c55fe642a239ee97ac7a3161ae89'
                this.mapContainer.appendChild(script)
                console.log('document body', this.mapContainer.innerHTML)
            } else {
                resolve()
            }
        })
    }

    validateKakaoMapInit () {
        if (!this.kakao || !this.mapContainer) {
            throw new Error('[kakaoMap.controller] [validateKakaoMapInit] Map not available')
        }
    }

    validateKakaoMapInstance () {
        if (!this.map) {
            throw new Error('[kakaoMap.controller] [validateKakaoMapInstance] Map instance null')
        }
    }

    initMap () {
        // this.setZoom(3)
        // this.moveCenter(35.19656853772262, 129.0807270648317)
        const options = {
            center: new this.kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
            level: 3
        }

        this.map = new this.kakao.maps.Map(this.mapContainer, options)
        // const markerPosition = new this.kakao.maps.LatLng(35.19656853772262, 129.0807270648317)

        // const marker = new this.kakao.maps.Marker({
        //     position: markerPosition
        // })
        // marker.setMap(map)
        console.log('[kakaoMap.controller] [initMap] Init map instance')
    }

    setZoom (lv) {
        this.validateKakaoMapInstance()
        this.map.setLevel(lv)
        return lv
    }

    getZoom () {
        this.validateKakaoMapInstance()
        return this.map.getLevel()
    }

    moveCenter (lat, lot) {
        this.validateKakaoMapInstance()
        const moveLatLon = new this.kakao.maps.LatLng(lat, lot)
        // 지도 중심을 이동 시킵니다
        this.map.setCenter(moveLatLon)
    }

    getCenter () {
        this.validateKakaoMapInstance()
        return this.map.getCenter()
    }

    addr2LatLot (addr) {
        return new Promise((resolve, reject) => {
            this.validateKakaoMapInstance()
            const geocoder = new this.kakao.maps.services.Geocoder()
            geocoder.addressSearch(addr, (result, status) => {
                if (status === this.kakao.maps.services.Status.OK && result && result.length > 0) {
                    resolve({
                        lat: result[0].y,
                        lot: result[0].x
                    })
                } else if (status === this.kakao.maps.services.Status.OK && result && result.length === 0) {
                    reject(new Error(`Empty result: ${status}`))
                } else {
                    reject(new Error(`Cannot get address search result: ${status}`))
                }
            })
        })
    }

    latLot2Addr (lat, lot) {
        return new Promise((resolve, reject) => {
            this.validateKakaoMapInstance()
            const geocoder = new this.kakao.maps.services.Geocoder()
            geocoder.coord2RegionCode(lot, lat, (result, status) => {
                if (status === this.kakao.maps.services.Status.OK && result) {
                    const data = result.find((item) => item.region_type === 'H')
                    if (data) {
                        resolve(data)
                    } else {
                        reject(new Error(`Cannot find region code result: ${status}`))
                    }
                } else {
                    reject(new Error(`Cannot get region code result: ${status}`))
                }
            })
        })
    }

    // {
    //     lat:,
    //     lot:,
    //     content,
    //     xAnchor: 0.3,
    //     yAnchor: 0.91
    // }
    addCustomOverlay (item) {
        this.validateKakaoMapInstance()
        const customOverlay = new this.kakao.maps.CustomOverlay({
            position: new this.kakao.maps.LatLng(item.lat, item.lot),
            ...item
        })
        customOverlay.setMap(this.map)
        this.customOverlayList.push(customOverlay)
        return customOverlay
    }

    modifyCustomOverlay (idx, item) {
        this.deleteCustomOverlay(idx, 0)
        this.customOverlayList[idx] = this.addCustomOverlay(item)
    }

    deleteCustomOverlay (idx, withSplice = 1) {
        this.validateKakaoMapInstance()
        if (idx < 0 || idx >= this.customOverlayList.length) {
            throw new Error(`Over / Under flow exception`)
        }

        this.customOverlayList[idx].setMap(null)
        this.customOverlayList.splice(idx, withSplice)
    }

    setCustomOverlayList (array) {
        this.resetCustomOverlayList()
        if (!array && array.length < 0) {
            throw new Error(`Unexpected array detected`)
        }

        array.forEach(item => {
            this.addCustomOverlay(item)
        })
    }

    resetCustomOverlayList () {
        this.validateKakaoMapInstance()
        this.customOverlayList.forEach((item, idx) => this.deleteCustomOverlay(idx, 0))
        this.customOverlayList.length = 0
    }

    addMarker (lat, lot) {
        this.validateKakaoMapInstance()
        const markerPosition = new this.kakao.maps.LatLng(lat, lot)

        const marker = new this.kakao.maps.Marker({
            position: markerPosition
        })
        marker.setMap(this.map)
        this.markerList.push(marker)
        return marker
    }

    modifyMarker (idx, lat, lot) {
        this.deleteMarker(idx, 0)
        this.markerList[idx] = this.addMarker(lat, lot)
    }

    deleteMarker (idx, withSplice = 1) {
        this.validateKakaoMapInstance()
        if (idx < 0 || idx >= this.markerList.length) {
            throw new Error(`Over / Under flow exception`)
        }

        this.markerList[idx].setMap(null)
        this.markerList.splice(idx, withSplice)
    }

    setMarkerList (array) {
        this.resetMarkerList()
        if (!array && array.length < 0) {
            throw new Error(`Unexpected array detected`)
        }

        array.forEach(item => {
            this.addMarker(item.lat, item.lot)
        })
    }

    resetMarkerList () {
        this.validateKakaoMapInstance()
        this.markerList.forEach((item, idx) => this.deleteMarker(idx, 0))
        this.markerList.length = 0
    }
}
