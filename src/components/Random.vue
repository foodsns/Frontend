<template>
    <div>
      <b-button v-b-tooltip.hover.topright.v-secondary title="음식점 랜덤선택"
      placement = "bottom"
        class = "random-btn"
        pill variant="outline-secondary"
        @click="onRandomBtnClicked()"
        id = "randomBtn">
        <font-awesome-icon icon="dice" style="margin-right: 5px"/>
      </b-button>
      <div id="custom-backdrop" ref="custom-backdrop" v-if="suffleIdx >= 0" @click="onRandomCloseBtnClicked()">
        <span id="btn-close" @click="onRandomCloseBtnClicked()">
          <font-awesome-icon icon="times"/>
        </span>
        <div id="shuffleMsg">
        {{suffleMsgList[suffleIdx]}}
        </div>
        <div id="post">
          <template v-if="selectedRandomPost">
            <post-box v-bind:post="selectedRandomPost" :key="selectedRandomPost.id"></post-box>
          </template>
          <template v-else>
            <div @click="onStartRandom()">
              <post-box v-bind:post="defaultPost"></post-box>
            </div>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    postListProps: {
        type: Array,
        default: function () {
            return []
        }
    }
  },
  data () {
    return {
      closeToggle: true,
      hashTagList: [],
      selectedRandomPost: null,
      suffleIdx: -1,
      suffleMsgList: [
        '맛있는 고민을 시작해볼까요?',
        '최고의 맛을 고르는 중...',
        '짜잔~! 이건 어때요?'
      ],
      defaultPost: {
                  docID: '',
                  title: 'Undefined',
                  descript: '...',
                  date: '',
                  profileImg: Vue.prototype.$markerImg || '',
                  writer: '먹었소',
                  good: 0,
                  img: Vue.prototype.$markerImg || '',
                  hashtag: '#클릭해서 랜덤 돌리기'
              }
    }
  },
  methods: {
    showRandomdModal: function () {
      this.$bvModal.msgBoxConfirm('랜덤결과 창입니다.', {
        title: ' ',
        hideHeaderClose: false
      })
    },
    onRandomCloseBtnClicked: function () {
      if (!this.closeToggle) {
        this.closeToggle = true
        return
      }
      this.selectedRandomPost = null
      this.suffleIdx = -1
    },
    onRandomBtnClicked: function (devMode = false, randomVal = -1) {
      this.selectedRandomPost = null
      this.suffleIdx = 0
    },
    onStartRandom: function (devMode = false, randomVal = -1) {
      this.closeToggle = false
      this.suffleIdx = 1
      const postList = this.postListProps
      // this.selectedRandomPost = this.calcGoodCountBasedRandom(postList, devMode, randomVal)
      // console.log('ran', this.selectedRandomPost)
      this.randomAnimation(postList)
      .then(() => {
        this.selectedRandomPost = this.calcGoodCountBasedRandom(postList, devMode, randomVal)
        this.suffleIdx = 2
      })
    },
    delay: function () {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 200)
      })
    },
    simpleRandomSelect: function (postList) {
      return new Promise((resolve) => {
        const idx = this.getRandomInt(0, postList.length)
        this.selectedRandomPost = postList[idx]
        resolve()
      })
    },
    randomAnimation: function (postList, cnt = 10) {
      return this.simpleRandomSelect(postList)
      .then(() => this.delay())
      .then(() => {
        if (cnt <= 0) {
          return cnt
        } else {
          return this.randomAnimation(postList, cnt - 1)
        }
      })
    },
    getRandomInt: function (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    loadHashTagList: function (devMode) {
    // 0: (2) ['#맛집', 3]
    // 1: (2) ['#삼성컨퍼런스', 1]
    // 2: (2) ['#코코로벤또', 1]
    // 3: (2) ['#온더보더', 1]
    // 4: (2) ['#롯데월드', 1]
    // 5: (2) ['#아웃백', 1]
      return devMode ? this.hashTagList : this.$parent.$refs['hashtagEle'].renderHashtag
    },
    getFilteredPostListUsingHashtag: function (postList, devMode = false) {
      const hashTagList = this.loadHashTagList(devMode)
      if (!hashTagList || hashTagList.length <= 0 || !postList || postList.length <= 0) {
        console.warn(`[Random] [getFilteredPostListUsingHashtag] Empty hash tag list or post list detected!`)
        return null
      }

      const hashTagNameList = hashTagList.map(hashtag => hashtag[0])
      return postList.filter(post => hashTagNameList.includes(post.hashtag))
    },
    calcRatioFilteredPostList: function (filteredPostList) {
      const sum = filteredPostList.reduce((p, c) => p + c.good, 0)
      return filteredPostList.map(i => {
        return {
          ...i,
          ratio: i.good / sum
        }
      })
    },
    calcGoodCountBasedRandom: function (postList, devMode = false, randomVal = -1) {
      const filteredPostList = this.getFilteredPostListUsingHashtag(postList, devMode)
      if (!filteredPostList || filteredPostList.length <= 0) {
        console.warn(`[Random] [calcGoodCountBasedRandom] Empty hashtag based filtered post list`)
        return null
      }
      const filteredPostRandomRatioList = this.calcRatioFilteredPostList(filteredPostList)
      const ranVal = devMode && randomVal > 0 ? randomVal : Math.random()
      if (ranVal < 0 || ranVal > 1) {
        console.warn(`[Random] [calcGoodCountBasedRandom] Out of range ranVal: ${ranVal}`)
        return null
      }

      for (let ran = 0, i = 0; i < filteredPostRandomRatioList.length && ran < 1; i++) {
        if (ran <= ranVal && ranVal < ran + filteredPostRandomRatioList[i].ratio) {
          console.log(`[Random] [calcGoodCountBasedRandom] Choosed post`, filteredPostRandomRatioList[i])
          return filteredPostRandomRatioList[i]
        }
        ran += filteredPostRandomRatioList[i].ratio
      }
      console.warn(`[Random] [calcGoodCountBasedRandom] No one choosed. Ranval: ${ranVal}`)
      return null
    }
    // calcHashTagBasedRandom: function (postList, devMode = false, randomVal = -1) {
    //   const hashTagList = this.loadHashTagList(devMode)
    //   console.log(!hashTagList, hashTagList.length <= 0, !postList, postList.length <= 0, hashTagList)
    //   if (!hashTagList || hashTagList.length <= 0 || !postList || postList.length <= 0) {
    //     console.warn(`[Random] [calcHashTagBasedRandom] Empty hash tag list or post list detected!`)
    //     return null
    //   }
    //   const sum = hashTagList.reduce((p, c) => p + Number(c[1]), 0)
    //   const randomList = hashTagList.map((item, idx) => [...item, item[1] / sum])
    //   const ranVal = devMode && randomVal >= 0 ? randomVal : Math.random()
    //   console.log(`[Random] [calcHashTagBasedRandom] randomList:`, randomList, `, ranVal : ${ranVal}, sum: ${sum}`)
    //   for (let ran = 0, i = 0; ran < 1 && i < randomList.length; i++) {
    //     if (ran <= ranVal && ranVal < ran + randomList[i][2]) {
    //       console.log(`[Random] [calcHashTagBasedRandom] Choosed hashtag found: ${hashTagList[i][0]}`)
    //       return hashTagList[i][0]
    //     }
    //     ran += randomList[i][2]
    //   }
    //   return null
    // },
    // choosePost: function (postList, devMode = false, randomVal = -1) {
    //   console.log(`[Random] [choosePost] postlist:`, postList, devMode, randomVal)
    //   const choosedHashTag = this.calcHashTagBasedRandom(postList, devMode, randomVal)
    //   if (!choosedHashTag) {
    //     console.warn(`[Random] [choosePost] Any hashtag not chosen`)
    //     return null
    //   }
    //   const filteredPostList = postList.filter(item => item.hashtag === choosedHashTag)
    //   if (!filteredPostList || filteredPostList.length <= 0) {
    //     console.warn(`[Random] [choosePost] ${choosedHashTag}: empty post list`)
    //     return null
    //   }
    //   return filteredPostList[this.getRandomInt(0, filteredPostList.length)]
    // }
  }
}
</script>

<style>
.random-btn{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

div#custom-backdrop {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

div#custom-backdrop > div#post {
  width: 300px;
  height: 400px;
}

div#shuffleMsg {
  color: white;
  font-size: 2em;
  margin-bottom: 15px;
}

div#custom-backdrop > div#post > div#postbox {
  margin: 0;
}

span#btn-close {
  color: white;
  font-size: 2.5em;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
</style>
