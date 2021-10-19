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
import { faUserSecret, faHeart, faMap, faTh, faUser,
        faSignInAlt, faArrowRight, faArrowLeft,
        faSpinner, faArrowDown, faMapMarkerAlt,
        faCameraRetro, faGlobeAsia, faLock} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import app from './firebaseApp'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { MdButton, MdContent, MdTabs, MdChips } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import PostBox from './components/PostBox'
import GridMapToggle from './components/GridMapToggle'
import GoogleSign from './components/GoogleSign'
import Scrollbar from './components/Scrollbar'
import ProfileIcon from './components/ProfileIcon'
import Random from './components/Random'
import KakaoMap from './components/KakaoMap'
import GridBoard from './components/GridBoard'
import MapBoard from './components/MapBoard'
import GoodList from './components/GoodList'
import GoodListPage from './components/GoodListPage'
import InfiniteScroll from './components/InfiniteScroll'
import Hashtag from './components/Hashtag'
import MainLogo from './components/MainLogo'
import UserGps from './components/userGps'
import CropModal from './components/CropModal'
import WritePostUI from './components/WritePostUI'

// Initialize Firebase
getAnalytics(app)

library.add(faUserSecret)
library.add(faHeart)
library.add(faMap)
library.add(faTh)
library.add(faGoogle)
library.add(faUser)
library.add(faSignInAlt)
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faSpinner)
library.add(faArrowDown)
library.add(faMapMarkerAlt)
library.add(faCameraRetro)
library.add(faGlobeAsia)
library.add(faLock)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('post-box', PostBox)
Vue.component('grid-map-toggle', GridMapToggle)
Vue.component('google-sign', GoogleSign)
Vue.component('scrollbar', Scrollbar)
Vue.component('profile-icon', ProfileIcon)
Vue.component('random-btn', Random)
Vue.component('kakao-map', KakaoMap)
Vue.component('grid-board', GridBoard)
Vue.component('map-board', MapBoard)
Vue.component('goodlist-btn', GoodList)
Vue.component('goodlist', GoodListPage)
Vue.component('infinite-scroll', InfiniteScroll)
Vue.component('hash-tag', Hashtag)
Vue.component('main-logo', MainLogo)
Vue.component('user-gps-logo', UserGps)
Vue.component('crop-modal', CropModal)
Vue.component('write-post-ui', WritePostUI)

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdChips)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue, {
  breakpoints: [`xs`, 'sm', 'md', 'lg', 'xl', 'xxl']
})
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
