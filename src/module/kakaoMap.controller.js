export default class KakaoMapController {
    kakao = null
    mapContainer = null
    map = null
    customOverlayList = []
    markerList = []
    beforeMarkerId = null
    prefix = 'id-'
    onMarkerClicked = null
    onCustomOverlayClicked = null

    constructor (mapEle, onMarkerClicked = null, onCustomOverlayClicked = null) {
        this.mapContainer = mapEle // document.querySelector(mapEleId)

        if (!this.mapContainer) {
            throw new Error(`Map container is null`)
        }
        this.onMarkerClicked = onMarkerClicked
        this.onCustomOverlayClicked = onCustomOverlayClicked
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

    initMap (lat = 37.5662952, lot = 126.9757511) {
        // this.setZoom(3)
        // this.moveCenter(35.19656853772262, 129.0807270648317)
        const options = {
            center: new this.kakao.maps.LatLng(lat, lot),
            level: 3
        }

        this.map = new this.kakao.maps.Map(this.mapContainer, options)
        // const markerPosition = new this.kakao.maps.LatLng(35.19656853772262, 129.0807270648317)

        // const marker = new this.kakao.maps.Marker({
        //     position: markerPosition
        // })
        // marker.setMap(map)
        console.log('[kakaoMap.controller] [initMap] Init map instance')
        // this.addMarker(35.19656853772262, 129.0807270648317)
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
    customOverlayTemplate (item) {
        return `
            <div id="${this.prefix}${item.id}" hidden="hidden" style="
            background-image: url(${item.img});
            width: 150px;
            height: 150px;
            border-radius: 15px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;
            " data-overlay="${item.id}">
                <div style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                    border-radius: 15px;
                    text-align: left;
                    padding: 5px;">
                    <span style="
                        font-size: 1.2em;
                        font-weight: bold;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 140px;
                        display: inline-block;">
                        ${item.title}
                    </span>
                    <p style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        overflow-wrap: break-word;
                        word-break: break-all;
                        height: 50px;">
                        ${item.descript}
                    </p>
                    <img data-v-8bdc44ea="" src="${item.profileImg}" style="
                        width: 24px;
                        height: 24px;
                        left: 5px;
                        bottom: 5px;
                        position: absolute;
                        border-radius: 12px;
                    ">
                    <svg data-v-8bdc44ea="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="heart fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-heart-fill gap_margin_5px_horizontal b-icon bi" style="
    right: 5px;
    bottom: 5px;
    position: absolute;
"><g data-v-8bdc44ea=""><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></g></svg>
                </div>
            </div>
        `
    }

    addCustomOverlay (item) {
        this.validateKakaoMapInstance()
        const customOverlay = new this.kakao.maps.CustomOverlay({
            position: new this.kakao.maps.LatLng(item.lat, item.lot),
            content: this.customOverlayTemplate(item),
            xAnchor: 0.5,
            yAnchor: 1.3,
            ...item
        })
        // https://devtalk.kakao.com/t/topic/44205/8
        customOverlay.a.addEventListener('click', (e) => {
            if (this.onCustomOverlayClicked) {
                this.onCustomOverlayClicked(item.id)
            }
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
        console.log('setCustomOverlayList', array)
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

    testClick () {
        // console.log(this.markerList[0].Ec.parentNode, this.markerList[0].Ec.parentNode.click())
        this.kakao.maps.event.trigger(this.markerList[1], 'click')
    }

    addMarker (lat, lot, id) {
        this.validateKakaoMapInstance()
        const markerPosition = new this.kakao.maps.LatLng(lat, lot)

        const marker = new this.kakao.maps.Marker({
            position: markerPosition
        })
        this.kakao.maps.event.addListener(marker, 'click', () => {
            if (this.beforeMarkerId === id && document.querySelector(`#${this.prefix}${id}`)) {
                if (document.querySelector(`#${this.prefix}${id}`).hasAttribute('hidden')) {
                    document.querySelector(`#${this.prefix}${id}`).removeAttribute('hidden')
                    if (this.onMarkerClicked) {
                        this.onMarkerClicked(id)
                    }
                } else {
                    document.querySelector(`#${this.prefix}${id}`).setAttribute('hidden', 'hidden')
                }
            } else {
                if (document.querySelector(`#${this.prefix}${id}`)) {
                    document.querySelector(`#${this.prefix}${id}`).removeAttribute('hidden')
                    document.querySelector(`#${this.prefix}${id}`).parentNode.style.margin = '-195px 0px 0px -75px'
                    if (this.onMarkerClicked) {
                        this.onMarkerClicked(id)
                    }
                }
                if (this.beforeMarkerId && document.querySelector(`#${this.prefix}${this.beforeMarkerId}`)) {
                    document.querySelector(`#${this.prefix}${this.beforeMarkerId}`).setAttribute('hidden', 'hidden')
                }
            }
            this.beforeMarkerId = id
        })
        marker.setMap(this.map)
        this.markerList.push(marker)
        return marker
    }

    modifyMarker (idx, lat, lot, id) {
        this.deleteMarker(idx, 0)
        this.markerList[idx] = this.addMarker(lat, lot, id)
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
            this.addMarker(item.lat, item.lot, item.id)
        })
    }

    resetMarkerList () {
        this.validateKakaoMapInstance()
        this.markerList.forEach((item, idx) => this.deleteMarker(idx, 0))
        this.markerList.length = 0
    }
}
