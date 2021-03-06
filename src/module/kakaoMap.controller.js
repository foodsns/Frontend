import {makeDonuuut} from 'donuuut'
import markerImg from '../assets/marker.png'

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

    focusedMarkerID = null
    focusedCustomOverlayID = null

    ICON_SIZE = 64

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
        // ?????? ????????? ?????? ????????????
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
            <div id="${this.prefix}${item.id}" style="
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
                        width: 100%;
                        height: 70px;">
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
                    <span id="close" style="
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 1.75em;
">
    <svg data-v-f266cf20="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11"><path data-v-f266cf20="" fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>
</span>
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
        customOverlay.data = item
        customOverlay.setVisible(false)
        // https://devtalk.kakao.com/t/topic/44205/8
        customOverlay.a.querySelector('span#close').addEventListener('click', (e) => {
            customOverlay.setVisible(!customOverlay.getVisible())
        })
        customOverlay.a.querySelector('p').addEventListener('click', (e) => {
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
        let removeExcludeFocusedItem = false
        this.validateKakaoMapInstance()
        this.customOverlayList.forEach((item, idx) => {
            if (!this.focusedCustomOverlayID && item.data.id !== this.focusedCustomOverlayID) {
                this.deleteCustomOverlay(idx, 0)
            } else if (this.focusedCustomOverlayID && item.data.id === this.focusedCustomOverlayID) {
                this.customOverlayList[0] = this.customOverlayList[idx]
                removeExcludeFocusedItem = true
            }
        })
        this.customOverlayList.length = this.focusedCustomOverlayID && removeExcludeFocusedItem ? 1 : 0
    }

    testClick () {
        // console.log(this.markerList[0].Ec.parentNode, this.markerList[0].Ec.parentNode.click())
        this.kakao.maps.event.trigger(this.markerList[1], 'click')
    }

    addMarker (lat, lot, id, x, y) {
        this.validateKakaoMapInstance()
        const markerPosition = new this.kakao.maps.LatLng(lat, lot)

        var icon = new this.kakao.maps.MarkerImage(
            markerImg,
            new this.kakao.maps.Size(this.ICON_SIZE, this.ICON_SIZE),
            {
                offset: new this.kakao.maps.Point(x, y)
            }
        )

        const marker = new this.kakao.maps.Marker({
            position: markerPosition,
            image: icon
        })
        this.kakao.maps.event.addListener(marker, 'click', () => {
            const linkedCustomOverlay = this.customOverlayList.find(overlay => overlay.data.id === id)

            if (id === this.beforeMarkerId) {
                this.beforeMarkerId = null
            }
            if (linkedCustomOverlay) {
                if (!linkedCustomOverlay.getVisible()) {
                    this.onMarkerClicked(id)
                    this.focusedMarkerID = id
                    this.focusedCustomOverlayID = linkedCustomOverlay.data.id
                } else {
                    this.focusedMarkerID = null
                    this.focusedCustomOverlayID = null
                }
                linkedCustomOverlay.setVisible(!linkedCustomOverlay.getVisible())
            } else if (!linkedCustomOverlay) {
                console.warn(`[kakaoMap.controller] [addMarker.addListener] Cannot find clicked overlay id: ${id}`)
                this.focusedMarkerID = null
                this.focusedCustomOverlayID = null
            }

            const previousCustomOverlay = this.customOverlayList.find(overlay => overlay.data.id === this.beforeMarkerId)

            if (previousCustomOverlay) {
                previousCustomOverlay.setVisible(false)
            } else {
                console.warn(`[kakaoMap.controller] [addMarker.addListener] Cannot find previous overlay id: ${this.beforeMarkerId}`)
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

    findDuplicatePosMarker (array) {
        const latLotDic = {}
        array.forEach(item => {
            const key = `${item.lat}_${item.lot}`
            // console.log(`key`, key, latLotDic.hasOwnProperty(key))
            if (latLotDic.hasOwnProperty(key)) {
                latLotDic[key].push(item)
            } else {
                latLotDic[key] = [item]
            }
        })
        const fixedArray = []
        Object.keys(latLotDic).forEach(key => {
            const donuutArray = makeDonuuut(
                {
                    blockSize: this.ICON_SIZE,
                    radius: 90,
                    offset: this.ICON_SIZE / 2,
                    itemSize: latLotDic[key].length
                })
            // console.log('key', key, donuutArray)
            let idx = 0
            latLotDic[key].forEach(item => {
                item.offsetX = donuutArray[idx].x
                item.offsetY = donuutArray[idx].y
                idx++
                fixedArray.push(item)
            })
        })
        return fixedArray
    }

    setMarkerList (array) {
        this.resetMarkerList()
        if (!array && array.length < 0) {
            throw new Error(`Unexpected array detected`)
        }

        array = this.findDuplicatePosMarker(array)
        console.log('setMarkerList', array)

        array.forEach(item => {
            this.addMarker(item.lat, item.lot, item.id, item.offsetX, item.offsetY)
        })
    }

    resetMarkerList () {
        this.validateKakaoMapInstance()
        this.markerList.forEach((item, idx) => this.deleteMarker(idx, 0))
        this.markerList.length = 0
    }
}
