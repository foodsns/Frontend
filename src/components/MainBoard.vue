<template>
  <div id="mainboard">
    <kakao-map v-if="viewMode === 'map'" v-bind:postListProps="postList"></kakao-map>
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
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px;border: 5px dotted black; border-radius: 15px; height: 225px;padding: 5px; position: relative">
          <!-- TODO: Write post UI component. -->
          Write post UI
        </b-col>
      </b-row>
      <grid-board v-if="viewMode === 'grid'" v-bind:postListProps="postList"></grid-board>
    </b-container>
    <div class="wrapper" v-if="viewMode === 'map'" v-bind:style="openSideList ? 'transform: translateX(0px);' : 'transform: translateX(-300px);'">
      <div class="list">
        <b-container fluid>
          <grid-board v-bind:postListProps="postList" v-bind:onlyOneLine="true"></grid-board>
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
        postList: [
                {
                    id: '993915c4-878b-4486-b9a8-052971a9620d',
                    title: '서울 시청',
                    descript: '2012년에 세운 정부의 현대적인 명소로, 1925년에 지었으며 현재는 도서관이 된 옛 시청 건물 옆에 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 1,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipNV5Yhw_FPjQZjJIHuP7qHexF6Xf5L-WQiVOwQP=w426-h240-k-no',
                    lat: 37.5662952,
                    lot: 126.9757511
                },
                {
                    id: '525d7948-d35a-4104-8cbb-ab70f0ced1d1',
                    title: '덕수궁',
                    descript: '서울의 심장부에 있는 유서 깊은 궁전으로 왕궁수문장 교대 의식을 볼 수 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 2,
                    img: 'https://lh4.googleusercontent.com/proxy/iXWBp-j7fRTrYU1NYIjo5ZR_gV0cQJUmSxXSZEavdqBGpiN_llGmFyKBBrGwt_tgV2ssACYGfZu3v8qM8AM6IgWizSphptS5ekVhbk5g613qIJlG1cYZv2lnS3-oSFuXKs9uZ8uk8LkdzpMM7E5kzCULN5EirMI=w438-h240-k-no',
                    lat: 37.5653575,
                    lot: 126.9737973
                },
                {
                    id: '9758a109-3adc-4dc3-a50c-d25afa839e05',
                    title: '시청역',
                    descript: '서울 시청역',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 3,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipM2LpBxqpI0LA4Joyfrsw2v9QoZkhBh7x_jbBoz=w408-h544-k-no',
                    lat: 37.5653574,
                    lot: 126.9737866
                },
                {
                    id: '5895722f-f12a-4572-9260-888b5b3e2072',
                    title: '미국대사관저',
                    descript: '미국대사관저',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 4,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipNLk6UTEICwua6OaWMv_p5yoEgGQlZmXwQGIXcP=w408-h306-k-no',
                    lat: 37.5670347,
                    lot: 126.9715391
                },
                {
                    id: '9a9b35a1-d737-4c32-ad1d-0c9329bbd717',
                    title: '동화면세점',
                    descript: '동화면세점',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 5,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipOf32XPC20NngLmrE5pXvARaWG739YfNfU9WYDv=w408-h306-k-no',
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
                    img: 'https://lh5.googleusercontent.com/p/AF1QipOQEUNavSYAzsvwEGOc1tfRpL7cLT2PqNRYtOb3=w408-h544-k-no',
                    lat: 37.5712125,
                    lot: 126.9757963
                },
                {
                    id: '83775fa5-97b0-4dde-92f5-7721d52de1eb',
                    title: 'KT광화문지사',
                    descript: 'KT광화문지사',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 7,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png',
                    lat: 37.572357,
                    lot: 126.975124
                },
                {
                    id: 'ae3f053e-e0d4-486b-af6e-3d6138d426f9',
                    title: '구 러시아공사관',
                    descript: '구 러시아공사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 8,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipP6MopGbzD-G1ZyjsRS-QJdYORO0wGw-620RrQq=w408-h306-k-no',
                    lat: 37.567963,
                    lot: 126.969243
                }
            ]
    }
  },
  mounted () {
    const dev = localStorage.getItem('dev') || false
    if (dev) {
      this.postList = JSON.parse(localStorage.getItem('postList')) || []
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(`[MainBoard] [onViewModeChanged] mode: ${mode}`)
      this.viewMode = mode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainboard {
  margin-top: 60px;
  position: relative;
}
#mainboard .wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    max-width: 350px;
    z-index: 999;
    overflow-y: hidden;
    height: calc(100vh - 90px);
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
</style>
