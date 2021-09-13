// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import PostBox from './components/PostBox'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB-HsMnu4Q1nxk1r2smnX3BM-OfTi1ITxI',
  authDomain: 'mogutsou.firebaseapp.com',
  projectId: 'mogutsou',
  storageBucket: 'mogutsou.appspot.com',
  messagingSenderId: '240755752715',
  appId: '1:240755752715:web:80858af7f9fe24db112c0e',
  measurementId: 'G-K1ZD44ZVJX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

library.add(faUserSecret)
library.add(faHeart)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('post-box', PostBox)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
