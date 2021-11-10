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
      <div id="custom-backdrop" ref="custom-backdrop" v-if="selectedRandomPost">
        <span id="btn-close" @click="onRandomCloseBtnClicked()">
          <font-awesome-icon icon="times"/>
        </span>
        <div>
          <post-box v-bind:post="selectedRandomPost"></post-box>
        </div>
      </div>
    </div>
</template>

<script>
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
      hashTagList: [],
      selectedRandomPost: null
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
      this.selectedRandomPost = null
    },
    onRandomBtnClicked: function (devMode = false, randomVal = -1) {
      this.selectedRandomPost = null
      const postList = this.postListProps
      this.selectedRandomPost = this.calcGoodCountBasedRandom(postList, devMode, randomVal)
      console.log('ran', this.selectedRandomPost)
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
    calcGoodCountBasedRandom: function (postList, devMode = false, randomVal = -1) {
      const hashTagList = this.loadHashTagList(devMode)
      if (!hashTagList || hashTagList.length <= 0 || !postList || postList.length <= 0) {
        console.warn(`[Random] [calcGoodCountBasedRandom] Empty hash tag list or post list detected!`)
        return null
      }

      const hashTagNameList = hashTagList.map(hashtag => hashtag[0])
      const filteredPostList = postList.filter(post => hashTagNameList.includes(post.hashtag))
      if (!filteredPostList || filteredPostList.length <= 0) {
        console.warn(`[Random] [calcGoodCountBasedRandom] Empty hashtag based filtered post list`)
        return null
      }
      const sum = filteredPostList.reduce((p, c) => p + c.good, 0)
      const filteredPostRandomRatioList = filteredPostList.map(i => {
        return {
          ...i,
          ratio: i.good / sum
        }
      })
      console.log(sum, filteredPostRandomRatioList)

      const ranVal = devMode && randomVal > 0 ? randomVal : Math.random()

      if (ranVal < 0 || ranVal > 1) {
        console.warn(`[Random] [calcGoodCountBasedRandom] Out of range ranVal: ${ranVal}`)
        return null
      }

      for (let ran = 0, i = 0; i < filteredPostRandomRatioList.length && ran < 1; i++) {
        console.log('ran', ran, ranVal, ran + filteredPostRandomRatioList[i].ratio, 'i', i)
        if (ran <= ranVal && ranVal < ran + filteredPostRandomRatioList[i].ratio) {
          console.log(`[Random] [calcGoodCountBasedRandom] Choosed post`, filteredPostRandomRatioList[i])
          return filteredPostRandomRatioList[i]
        }
        ran += filteredPostRandomRatioList[i].ratio
      }
      console.warn(`[Random] [calcGoodCountBasedRandom] No one choosed. Ranval: ${ranVal}`)
      return null
    },
    calcHashTagBasedRandom: function (postList, devMode = false, randomVal = -1) {
      const hashTagList = this.loadHashTagList(devMode)
      console.log(!hashTagList, hashTagList.length <= 0, !postList, postList.length <= 0, hashTagList)
      if (!hashTagList || hashTagList.length <= 0 || !postList || postList.length <= 0) {
        console.warn(`[Random] [calcHashTagBasedRandom] Empty hash tag list or post list detected!`)
        return null
      }
      const sum = hashTagList.reduce((p, c) => p + Number(c[1]), 0)
      const randomList = hashTagList.map((item, idx) => [...item, item[1] / sum])
      const ranVal = devMode && randomVal >= 0 ? randomVal : Math.random()
      console.log(`[Random] [calcHashTagBasedRandom] randomList:`, randomList, `, ranVal : ${ranVal}, sum: ${sum}`)
      for (let ran = 0, i = 0; ran < 1 && i < randomList.length; i++) {
        if (ran <= ranVal && ranVal < ran + randomList[i][2]) {
          console.log(`[Random] [calcHashTagBasedRandom] Choosed hashtag found: ${hashTagList[i][0]}`)
          return hashTagList[i][0]
        }
        ran += randomList[i][2]
      }
      return null
    },
    choosePost: function (postList, devMode = false, randomVal = -1) {
      console.log(`[Random] [choosePost] postlist:`, postList, devMode, randomVal)
      const choosedHashTag = this.calcHashTagBasedRandom(postList, devMode, randomVal)
      if (!choosedHashTag) {
        console.warn(`[Random] [choosePost] Any hashtag not chosen`)
        return null
      }
      const filteredPostList = postList.filter(item => item.hashtag === choosedHashTag)
      if (!filteredPostList || filteredPostList.length <= 0) {
        console.warn(`[Random] [choosePost] ${choosedHashTag}: empty post list`)
        return null
      }
      return filteredPostList[this.getRandomInt(0, filteredPostList.length)]
    }
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
}

div#custom-backdrop > div {
  width: 300px;
  height: 400px;
}

div#custom-backdrop > div > div#postbox {
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
