<template>
  <div id="mainboard" ref="mainboard">
    <main-logo v-on:scrollMainboard="scrollMainboard"></main-logo>
    <kakao-map ref="kakaoMap" v-if="viewMode === 'map'"
              v-bind:postListProps="postList"
              v-bind:latProp="lastLoc.lat"
              v-bind:lotProp="lastLoc.lot"
              @on-marker-clicked="onMarkerClicked"
              @on-custom-overlay-clicked="onCustomOverlayClicked"></kakao-map>
    <b-container class="body">
      <b-row align-h="end">
        <b-col style="text-align: left;position:relative;">
          <b-button pill variant="outline-secondary" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"><font-awesome-icon icon="dice" style="margin-right: 5px"/></b-button>
          <goodlist-btn></goodlist-btn>
        </b-col>
        <b-col align-self="end" cols="5" style="text-align: right; margin-bottom: 15px">
          <profile-icon style="position: relative"></profile-icon>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8" style="text-align: left">
          <b-row style="margin-top: 5px;">
            <b-col style="position:relative">
              <span><user-gps-logo ref="userGps" @location="onGpsAddrLoaded" @err-msg="onGpsAddrFailed"></user-gps-logo></span>
              <span v-if="!addrEditExpand" @click="addrEditExpand = !addrEditExpand"><font-awesome-icon icon="sort-down" style="margin: 5px 0; width: 32px;cursor: pointer"/></span>
              <span v-else-if="addrEditExpand" @click="addrEditExpand = !addrEditExpand"><font-awesome-icon icon="sort-up" style="width: 32px;cursor: pointer"/></span>
              <b-button v-if="viewMode === 'map'" @click="formVisibleToggle = !formVisibleToggle" pill variant="outline-secondary" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"><font-awesome-icon icon="pencil-alt"/></b-button>
            </b-col>
          </b-row>
          <b-row style="margin-top:5px">
            <b-col lg="6" cols="12" style="position:relative">
              <template v-if="addrEditExpand">
                <b-input-group>
                  <b-form-input
                    v-model="fullAddr"
                    type="text"
                    placeholder="정확한 주소를 입력해주세요"
                    required
                    :disabled="!addrEdit"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-secondary" v-if="!addrEdit" @click="addrEdit = !addrEdit"><font-awesome-icon icon="edit"/></b-button>
                    <b-button variant="outline-secondary" v-if="addrEdit" @click="addrEdit = !addrEdit;$refs.userGps.getLatLotUsingAddr(fullAddr)"><font-awesome-icon icon="check"/></b-button>
                  </b-input-group-append>
                </b-input-group>
              </template>
              <template v-if="!addrEditExpand">
                <share-addr v-bind:fullAddr="fullAddr"></share-addr>
              </template>
              <template v-if="gpsAddrFailMsg">
                <div>
                  <span style="color:red">{{gpsAddrFailMsg}}</span>
                </div>
              </template>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4" class="toggle-btn">
          <grid-map-toggle @current-mode="onViewModeChanged" :mode="viewMode"></grid-map-toggle>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hashtag v-bind:postListProps="postList"></hashtag>
        </b-col>
      </b-row>
      <b-row align-h="center" v-if="viewMode === 'grid' || (viewMode === 'map' && formVisibleToggle)">
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px 0">
          <write-post-ui @submit-success="onSubmitPostSuccess"></write-post-ui>
        </b-col>
      </b-row>
      <grid-board v-if="viewMode === 'grid'" v-bind:postListProps="postList" v-bind:focusedPostID="focusedPost.id"></grid-board>
      <b-row v-if="viewMode === 'grid'">
        <b-col>
          <infinite-scroll v-bind:clientHeight="clientHeight"
                            v-bind:scrollHeight="scrollHeight"
                            v-bind:scrollTop="scrollTop"
                            v-bind:thresholdProp="threshold"
                            v-bind:messageProp.sync="scrollMsg"
                            @need-more="onScrollReachedBottom"></infinite-scroll>
        </b-col>
      </b-row>
    </b-container>
    <div class="wrapper" v-if="viewMode === 'map'" v-bind:style="openSideList ? 'transform: translateX(0px);' : 'transform: translateX(-300px);'">
      <div id="sideList" ref="sidelist" class="list">
        <b-container fluid>
          <grid-board v-bind:postListProps="postList" v-bind:onlyOneLine="true" v-bind:focusedPostID="focusedPost.id"></grid-board>
          <b-row>
            <b-col>
              <infinite-scroll v-bind:clientHeight="clientHeight"
                            v-bind:scrollHeight="scrollHeight"
                            v-bind:scrollTop="scrollTop"
                            v-bind:thresholdProp="threshold"
                            v-bind:messageProp.sync="scrollMsg"
                            @need-more="onScrollReachedBottom"></infinite-scroll>
            </b-col>
          </b-row>
        </b-container >
      </div>
      <div class="list-toggle" v-on:click="openSideList = !openSideList">
        <font-awesome-icon icon="arrow-right" v-if="!openSideList"/>
        <font-awesome-icon icon="arrow-left" v-else/>
      </div>
    </div>
    <!--<random-btn></random-btn>-->
    <!-- <b-button class = "random-btn" pill variant="outline-danger" v-on:click="greet">랜덤선택</b-button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Hashtag from './Hashtag.vue'
import FirestoreDao from '../module/firestore.dao'

export default {
  components: { Hashtag },
  name:
    'MainBoard',
  data () {
    return {
        msg: 'hello world',
        viewMode: 'grid',
        openSideList: false,
        focusedPost: {},
        focusedEditPost: {
          id: '',
          docID: '',
          title: '',
          descript: '',
          date: '',
          profileImg: '',
          writer: '',
          good: 0,
          img: null,
          lat: 0,
          lot: 0,
          visibility: 'public',
          authorId: '',
          country: null,
          city: null,
          state: null,
          street: null,
          hashtag: null
        },
        inputText: '',
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,
        threshold: 200,
        scrollMsg: '',
        isLoading: false,
        dummyCnt: 0,
        firestoreDao: new FirestoreDao(),
        postList: [],
        gpsAddrFailMsg: null,
        fullAddr: null,
        addrEdit: false,
        addrEditExpand: false,
        lastLoc: {
          addr1: null,
          addr2: null,
          addr3: null,
          lat: 37.5662952,
          lot: 126.9757511
        },
        formVisibleToggle: false
    }
  },
  watch: {
    viewMode: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          if (this.$refs.sidelist) {
            this.$refs.sidelist.addEventListener('scroll', this.scrollHandler)
          }
        })
      }
    }
  },
  mounted () {
    const dev = localStorage.getItem('dev') || false
    if (dev) {
      this.postList = JSON.parse(localStorage.getItem('postList')) || []
    } else {
      if (!this.fullAddr) {
        this.searchPosts()
      } else {
        this.$refs.userGps.getLatLotUsingAddr(this.fullAddr)
      }
      if (Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.eventBus) {
        Vue.prototype.$firebaseAuth.eventBus.$on('onAuthStateChanged', (isLoggedIn) => {
          this.$nextTick(() => {
            if (!this.fullAddr) {
              this.searchPosts()
            } else {
              this.$refs.userGps.getLatLotUsingAddr(this.fullAddr)
            }
          })
        })
      }
      if (Vue.prototype.$notify) {
        Vue.prototype.$notify.$on('Need refresh', () => {
          if (!this.fullAddr) {
            this.searchPosts()
          } else {
            this.$refs.userGps.getLatLotUsingAddr(this.fullAddr)
          }
        })
      }
    }

    this.$refs.mainboard.addEventListener('scroll', this.scrollHandler)
    this.$refs.mainboard.addEventListener('resize', this.scrollHandler)
    this.scrollHandler()
  },
  methods: {
    searchPosts (isInfinite = false, country = '대한민국', city = '서울특별시', state = '중구', street = '정동') {
      this.firestoreDao.selectPosts({
          lat: 37.566227,
          lot: 126.977966,
          distance: 1,
          sortBy: 'best',
          pageSize: 8,
          includeMine: false,
          country,
          city,
          state,
          street,
          uid: Vue.prototype.$firebaseAuth ? Vue.prototype.$firebaseAuth.getCurrentUserUid() : ''
      }, true)
      // https://stackoverflow.com/a/59289650/7270469
      .then(postList => {
        if (!isInfinite) {
          this.postList.splice(0)
        }
        return postList
      })
      .then(_postList => {
        if (!_postList || _postList.length <= 0) {
          this.scrollMsg = '더 이상 리뷰가 없어요.'
        }
        _postList.forEach(post => this.postList.push(post))
        return true
      })
      .then(() => {
          this.isLoading = false
      })
    },
    onScrollReachedBottom () {
      console.log(`[MainBoard] [onScrollReachedBottom] let's get more data`)
      if (!this.isLoading) {
        this.scrollMsg = ''
        this.isLoading = true
        this.searchPosts(true)
      }
    },
    scrollHandler () {
      switch (this.viewMode) {
        case 'grid':
          if (this.$refs.mainboard) {
            this.clientHeight = this.$refs.mainboard.clientHeight
            this.scrollHeight = this.$refs.mainboard.scrollHeight
            this.scrollTop = this.$refs.mainboard.scrollTop
          } else {
            console.warn(`[MainBoard] [scrollHandler] Undefined mainboard ref`)
          }
        break
        case 'map':
          if (this.$refs.sidelist) {
            this.clientHeight = this.$refs.sidelist.clientHeight
            this.scrollHeight = this.$refs.sidelist.scrollHeight
            this.scrollTop = this.$refs.sidelist.scrollTop
          } else {
            console.warn(`[MainBoard] [scrollHandler] Undefined sidelist ref`)
          }
        break
      }
      if (this.scrollMsg && this.clientHeight + this.scrollTop <= this.scrollHeight - this.threshold) {
        this.scrollMsg = ''
      }
    },
    onViewModeChanged: function (mode) {
      console.log(`[MainBoard] [onViewModeChanged] mode: ${mode}`)
      this.viewMode = mode
    },
    onMarkerClicked: function (post) {
      console.log(`[MainBoard] [onMarkerClicked] post: `, post)
      this.focusedPost = post
    },
    onCustomOverlayClicked: function (post) {
      console.log(`[MainBoard] [onCustomOverlayClicked] post: `, post)
      this.openSideList = true
      this.focusedPost = post
    },
    scrollMainboard: function () {
        this.$refs.mainboard.scrollTo(0, 0)
    },
    onGpsAddrLoaded: function (location) {
      this.fullAddr = `${location.addr1} ${location.addr2} ${location.addr3}`
      this.lastLoc = location
      if (this.viewMode === 'map') {
        this.$refs.kakaoMap.moveTo(Number(location.lat), Number(location.lot))
      } else if (this.viewMode === 'grid') {
        this.lastLoc.lat = Number(location.lat)
        this.lastLoc.lot = Number(location.lot)
      }
      this.$nextTick(() => {
        this.searchPosts(false, '대한민국', location.addr1, location.addr2, location.addr3)
      })
    },
    onGpsAddrFailed: function (errMsg) {
      this.gpsAddrFailMsg = errMsg
    },
    onSubmitPostSuccess: function () {
      this.$nextTick(() => {
        this.searchPosts(false, '대한민국', this.lastLoc.addr1, this.lastLoc.addr2, this.lastLoc.addr3)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainboard {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
#mainboard .body {
  padding-top: 60px;
}
#mainboard .wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    max-width: 320px;
    z-index: 999;
    overflow-y: hidden;
    height: 100vh;
    padding: 0;
    transition: .4s;
}

#mainboard .wrapper .list {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 300px;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: auto;
  height: 100%;
  padding: 5px 0px;
}

#mainboard .wrapper .list-toggle {
  position: fixed;
  left: 300px;
  top: calc(50% - 40px);
  width: 20px;
  height: 40px;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 999;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

@media (min-width: 768px) {
  #mainboard .wrapper {
      max-width: 330px;
  }
  #mainboard .wrapper .list-toggle {
    top: calc(50% - 60px);
    width: 30px;
    height: 60px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
}

#mainboard .wrapper .list-toggle svg {
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 1.2em;
}

#form-control{
    resize : none;
    margin-bottom : 5px;
    height:50%;
    position : relative;

}

.b-col {
  text-align: center;
  margin: 20px 0;
}

.b-col .post-item {
  display: inline-block;
  width: auto;
}

.toggle-btn {
  text-align: right;
}

.user-gps-btn {
  text-align: left;
}

input[type=text] {
  border: 0;
  outline: 0;
  border-bottom: 2px solid #212529;
}
div.input-group-append > button{
  border-color: transparent;
}
</style>
