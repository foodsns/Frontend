<template>
  <div id="mainboard" ref="mainboard">
    <main-logo v-on:scrollMainboard="scrollMainboard"></main-logo>
    <kakao-map v-if="viewMode === 'map'" v-bind:postListProps="postList"
              @on-marker-clicked="onMarkerClicked"
              @on-custom-overlay-clicked="onCustomOverlayClicked"></kakao-map>
    <b-container class="body">
      <b-row align-h="end">
        <b-col>
          <user-gps-logo class="user-gps-btn"></user-gps-logo>
        </b-col>
        <b-col align-self="end" cols="6" style="text-align: right; margin-bottom: 15px">
          <profile-icon style="position: relative"></profile-icon>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" style="text-align: left">
          <scrollbar style="position: relative"></scrollbar>
        </b-col>
        <b-col cols="6" class="toggle-btn">
          <grid-map-toggle @current-mode="onViewModeChanged" :mode="viewMode"></grid-map-toggle>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hashtag class="hashtag"></hashtag>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px 0">
          <crop-modal v-if="cropModal.show" v-bind:fileProp="cropModal.file" @close-modal="cropModal.show=false"></crop-modal>
          <div id="writePostUI" style="position: relative">
            <div class="form-floating">
              <textarea class="form-control" value="inputText" id="floatingTextarea" placeholder="내용입력" @keyup.#="hashE" enctype="multipart/form-data" style="resize:none; margin-bottom:5px"></textarea>
            </div>
            <div class="Buttons">
              <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <label class="btn btn-primary" pill variant="primary" for="filebtn">
                사진
                </label>
                <input type="file" id="filebtn" @change="uploadOnePhoto" style="display:none" accept="image/*" multiple/>
              </form>
              <button type="submit" class="btn btn-success" id="postbtn">확인</button>
            </div>
          </div>
        </b-col>
      </b-row>
      <grid-board v-if="viewMode === 'grid'" v-bind:postListProps="postList" v-bind:focusedPostID="focusedPost.id"></grid-board>
      <b-row v-if="viewMode === 'grid'">
        <b-col>
          <infinite-scroll  v-bind:clientHeight="clientHeight"
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
    <random-btn></random-btn>
    <goodlist-btn></goodlist-btn>
    <!-- <b-button class = "random-btn" pill variant="outline-danger" v-on:click="greet">랜덤선택</b-button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Hashtag from './Hashtag.vue'
import Scrollbar from './Scrollbar.vue'
import FirestoreDao from '../module/firestore.dao'

var count

export default {
  components: { Scrollbar, Hashtag },
  name:
    'MainBoard',
  data () {
    return {
        msg: 'hello world',
        viewMode: 'grid',
        openSideList: false,
        focusedPost: {},
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
        cropModal: {
          show: false,
          file: null
        }
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
      this.searchPosts()
      if (Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.eventBus) {
        Vue.prototype.$firebaseAuth.eventBus.$on('onAuthStateChanged', (isLoggedIn) => {
          this.searchPosts()
        })
      }
    }

    this.$refs.mainboard.addEventListener('scroll', this.scrollHandler)
    this.$refs.mainboard.addEventListener('resize', this.scrollHandler)
    this.scrollHandler()
  },
  methods: {
    searchPosts (isInfinite = false) {
      this.firestoreDao.selectPosts({
          lat: 37.566227,
          lot: 126.977966,
          distance: 1,
          sortBy: 'best',
          pageSize: 8,
          includeMine: false,
          country: 'Korea',
          city: '서울특별시',
          state: '중구',
          street: '정동',
          uid: Vue.prototype.$firebaseAuth ? Vue.prototype.$firebaseAuth.getCurrentUserUid() : ''
      })
      // https://stackoverflow.com/a/59289650/7270469
      .then(postList => {
        count = this.postList.length + 8
        console.log('postCount : ' + count)
        if (!isInfinite) {
          this.postList.splice(0)
        }
        return postList
      })
      .then(_postList => {
        console.log('postCount2 : ' + count)
        if (!_postList || _postList.length <= 0) {
          this.scrollMsg = '더 이상 리뷰가 없어요'
        }
        _postList.forEach(post => this.postList.push(post))
        this.scrollStop()
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
    // 현재 DB 모델이 한개의 파일만 입력하게끔 되어 있어,
    // 멀티 이미지 지원은 마지막 스프린트에 작업하는걸로
    uploadPhoto: function (e) {
      console.log('uploadPhoto :', e)
        if (e.target.files) {
          var fileList = e.target.files
          var maxSize = 3 * 1024 * 1024
          for (const file of fileList) {
            if (file.size > maxSize) {
              alert(file.name + ' : 3MB이하 이미지만 가능합니다.')
              return false
          }
        }
      }
    },
    uploadOnePhoto: function (e) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const maxSize = 3 * 1024 * 1024
        if (file.size <= maxSize) {
          this.cropModal.show = true
          this.cropModal.file = file
        } else {
          console.warn(`Maximum file size: ${maxSize}, current: ${file.size}`)
        }
      } else {
        console.warn('Empty file detected')
      }
    },
    scrollMainboard: function () {
      this.$refs.mainboard.scrollTo(0, 0)
    },
    scrollStop: function (e) {
      if (count >= 16) {
        console.log('데이터 그만 가져옴')
        e.preventDefault()
      }
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
    max-width: 350px;
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
  top: 50%;
  width: 40px;
  height: 80px;
  background-color: white;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  z-index: 999;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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

</style>
