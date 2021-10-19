<template>
    <span class = "userGps">
        <b-button pill variant="outline-secondary"><font-awesome-icon icon="map-marker-alt"/></b-button>
    </span>
</template>

<script>
export default {
    name: 'userGps',
    methods: {
        getLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                alert('주소: ' + position.coords.latitude + ' ' + position.coords.longitude)
                }, function (error) {
                console.error(error)
                }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
                })
            } else {
                alert('GPS를 지원하지 않습니다')
            }
        }
    }
}
</script>
