<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import FirebaseAuth from './module/firebaseAuth.controller'
import { EventBus } from './lib/event-bus'
import markerImg from './assets/marker.png'
import logoImg from './assets/logo.jpeg'
import Vue from 'vue'
import 'intro.js/introjs.css'
export default {
    name: 'App',
    beforeCreate () {
      Vue.prototype.$firebaseAuth = new FirebaseAuth()
      Vue.prototype.$notify = EventBus
      Vue.prototype.$markerImg = markerImg
      Vue.prototype.$logoImg = logoImg
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
