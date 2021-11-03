<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import FirebaseAuth from './module/firebaseAuth.controller'
import { EventBus } from './lib/event-bus'
import Vue from 'vue'
export default {
    name: 'App',
    beforeCreate () {
      Vue.prototype.$firebaseAuth = new FirebaseAuth()
      Vue.prototype.$notify = EventBus
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
