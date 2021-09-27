<template>
  <div id="mainboard" ref="mainboard">
    <kakao-map v-if="viewMode === 'map'" v-bind:postListProps="postList" @on-marker-clicked="onMarkerClicked"></kakao-map>
    <b-container >
      <b-row align-h="end">
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
      <b-row align-h="center">
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px 0">
          <div id="writePostUI" style="position: relative">
            <div>
              <textarea v-model="inputText" maxlength="280" placeholder="내용 입력" class="postBox"></textarea>
            </div>
            <div class="Buttons">
              <b-icon icon="camera-fill" class="camerabtn" @click="postclick()"></b-icon>
              <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
            </div>
          </div>
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
    <random-btn></random-btn>
    <goodlist-btn></goodlist-btn>
    <!-- <b-button class = "random-btn" pill variant="outline-danger" v-on:click="greet">랜덤선택</b-button> -->
  </div>
</template>

<script>
import Scrollbar from './Scrollbar.vue'
export default {
  components: { Scrollbar },
  name: 'MainBoard',
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
        postList: [
            ]
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
    }

    this.$refs.mainboard.addEventListener('scroll', this.scrollHandler)
    this.$refs.mainboard.addEventListener('resize', this.scrollHandler)
    this.scrollHandler()
  },
  methods: {
    onScrollReachedBottom () {
      console.log(`[MainBoard] [onScrollReachedBottom] let's get more data`)
      if (!this.isLoading) {
        this.scrollMsg = ''
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          if (this.dummyCnt < 0) {
            this.dummyCnt++
            const dummy = JSON.parse(JSON.stringify(this.postList))
            // this.postList = this.postList.concat(dummy)
            dummy.forEach(item => {
              this.postList.push(item)
            })
            console.log('concat', this.postList.length)
          } else {
            this.scrollMsg = '더 이상 리뷰가 없어요'
          }
        }, 2000)
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
    },
    onViewModeChanged: function (mode) {
      console.log(`[MainBoard] [onViewModeChanged] mode: ${mode}`)
      this.viewMode = mode
    },
    onMarkerClicked: function (post) {
      console.log(`[MainBoard] [onMarkerClicked] post: `, post)
      this.openSideList = true
      this.focusedPost = post
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainboard {
  padding-top: 60px;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
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

.postBox{
    resize : none;
    height : 100px;
    width : 100%;
}

.postbtn{
    margin : 2px;
}

</style>
