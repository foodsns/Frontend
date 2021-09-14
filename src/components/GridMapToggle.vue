<template>
  <div>
    <b-button-group>
      <b-button>
        <font-awesome-icon icon="th" />
      </b-button>
      <b-button>
        <font-awesome-icon icon="map" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: 'GridMapToggle',
  data () {
    return {
        currentMode: 'grid'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
