<template>
  <div id="mainboard">
    <b-container >
      <b-row align-h="end">
        <b-col align-self="end" cols="6" style="text-align: right; margin-bottom: 15px">
          <profile-icon></profile-icon>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" style="text-align: left">
          <scrollbar></scrollbar>
        </b-col>
        <b-col cols="6" class="toggle-btn">
          <grid-map-toggle @current-mode="onViewModeChanged" :mode="'grid'"></grid-map-toggle>
        </b-col>
      </b-row>
      <b-row align-h="center">
<<<<<<< Updated upstream
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px;border: 5px dotted black; border-radius: 15px; height: 225px;padding: 5px">
          <!-- TODO: Write post UI component. -->
          Write post UI
        </b-col>
      </b-row>
      <b-row>
        <b-col xxl="3" xl="4" lg="6" cols="12" class="b-col" v-for="(post, index) in postList" :key="index">
          <post-box v-bind:post="post" class="post-item"></post-box>
=======
        <b-col cols="12" md="6" lg="5" xl="4" style="margin: 15px 0">
          <div id="writePostUI" style="position: relative">
            <div>
              <div class="form-floating">
                <textarea class="form-control" id="floatingTextarea" style="resize:none; margin-bottom:5px; height:50%"></textarea>
              </div>
            </div>
            <div class="Buttons">
              <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <input type="file" name="file" style="display:none"/>
                <b-icon icon="camera-fill" type="button" class="camerabtn" onclick="onclick=document.all.file.click()"></b-icon>
              </form>
              <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
            </div>
          </div>
>>>>>>> Stashed changes
        </b-col>
      </b-row>
    </b-container>
    <random-btn></random-btn>
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
        postList: [
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          }
        ]
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(`[MainBoard] [onViewModeChanged] mode: ${mode}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainboard {
  margin-top: 60px;
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
