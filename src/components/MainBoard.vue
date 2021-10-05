<template>
  <div id="mainboard" ref="mainboard">
    <main-logo></main-logo>
    <kakao-map v-if="viewMode === 'map'" v-bind:postListProps="postList"
              @on-marker-clicked="onMarkerClicked"
              @on-custom-overlay-clicked="onCustomOverlayClicked"></kakao-map>
    <b-container class="body">
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
      <b-col>
        <hashtag class="hashtag"></hashtag>
      </b-col>
      <b-row align-h="center">
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px 0">
          <div id="writePostUI" style="position: relative">
            <div>
              <div class="form-floating">
                <textarea class="form-control" id="floatingTextarea" style="resize:none; margin-bottom:5px"></textarea>
              </div>
            </div>
            <div class="Buttons">
              <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <input type="file" name="files" style="display:none" accept="image/jpeg, image/png, image/jpg"/>
                <b-icon icon="camera-fill" type="button" class="camerabtn" onclick=document.all.file.click()></b-icon>
            </form>
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
import Hashtag from './Hashtag.vue'
import Scrollbar from './Scrollbar.vue'
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
        postList: [
                {
                    id: '993915c4-878b-4486-b9a8-052971a9620d',
                    title: '서울 시청',
                    descript: '2012년에 세운 정부의 현대적인 명소로, 1925년에 지었으며 현재는 도서관이 된 옛 시청 건물 옆에 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 1,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Seoul_City_Hall_20190608_001.jpg',
                    lat: 37.566543,
                    lot: 126.978421
                },
                {
                    id: '525d7948-d35a-4104-8cbb-ab70f0ced1d1',
                    title: '덕수궁',
                    descript: '서울의 심장부에 있는 유서 깊은 궁전으로 왕궁수문장 교대 의식을 볼 수 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 2,
                    img: 'https://www.heritage.go.kr/images/content/palaces/pd_pic01.jpg',
                    lat: 37.565772,
                    lot: 126.975160
                },
                {
                    id: '9758a109-3adc-4dc3-a50c-d25afa839e05',
                    title: '시청역',
                    descript: '서울 시청역',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 3,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/%EC%8B%9C%EC%B2%AD%EC%97%AD_%EC%97%AD%EB%AA%85%ED%8C%90%282%ED%98%B8%EC%84%A0%29.JPG',
                    lat: 37.565559,
                    lot: 126.977173
                },
                {
                    id: '5895722f-f12a-4572-9260-888b5b3e2072',
                    title: '미국대사관저',
                    descript: '미국대사관저',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 4,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/USA_Embassy_Building_in_Seoul.jpg/270px-USA_Embassy_Building_in_Seoul.jpg',
                    lat: 37.566940,
                    lot: 126.972958
                },
                {
                    id: '9a9b35a1-d737-4c32-ad1d-0c9329bbd717',
                    title: '동화면세점',
                    descript: '동화면세점',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 5,
                    img: 'https://ir.dwdfs.com/images/sub/about-ceo-visual.jpg',
                    lat: 37.569586,
                    lot: 126.976187
                },
                {
                    id: '26ddb129-3643-4836-bd99-7c56e6f5fd91',
                    title: '주한 콜롬비아 대사관',
                    descript: '주한 콜롬비아 대사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 6,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Bogot%C3%A1_embajada_de_Corea_del_Sur.JPG/270px-Bogot%C3%A1_embajada_de_Corea_del_Sur.JPG',
                    lat: 37.570936,
                    lot: 126.977952
                },
                {
                    id: '83775fa5-97b0-4dde-92f5-7721d52de1eb',
                    title: 'KT광화문지사',
                    descript: 'KT광화문지사',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 7,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_South_Korea_on_building.jpg/300px-Flag_of_South_Korea_on_building.jpg',
                    lat: 37.572008,
                    lot: 126.977951
                },
                {
                    id: 'ae3f053e-e0d4-486b-af6e-3d6138d426f9',
                    title: '구 러시아공사관',
                    descript: '구 러시아공사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 8,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Former_Russia_legation_of_Korea_01.JPG/272px-Former_Russia_legation_of_Korea_01.JPG',
                    lat: 37.568178,
                    lot: 126.971474
                }
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
          if (this.dummyCnt < 1) {
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
  padding-top: 160px;
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

</style>
