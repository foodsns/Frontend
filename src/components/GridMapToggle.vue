<template>
  <div>
    <b-button-group >
      <b-button :variant="currentMode == 'grid' ? 'warning' : ''" v-on:click="toggleMode('grid')">
        <font-awesome-icon icon="th"/>
      </b-button>
      <b-button :variant="currentMode == 'grid' ? '' : 'warning'" v-on:click="toggleMode('map')"
        v-intro ="'게시물의 음식점을 지도로 한 눈에 쉽게 확인할 수 있어요.'">
        <font-awesome-icon icon="map" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
    name: 'GridMapToggle',
    props: ['mode'],
    data () {
        return {
            currentMode: this.mode
        }
    },
    methods: {
        toggleMode: function (mode) {
            if (mode !== 'grid' && mode !== 'map') {
                mode = 'grid'
            }
            this.currentMode = mode
            this.$emit('current-mode', this.currentMode)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
