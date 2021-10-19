<template>
  <div id="writePostUI" style="position: relative">
    <crop-modal v-if="cropModal.show" v-bind:fileProp="cropModal.file" @close-modal="cropModal.show=false"></crop-modal>
    <b-form @submit.stop.prevent class="form-box">
      <b-row>
        <b-col>
          <b-form-textarea
            id="textarea"
            placeholder="식사는 어떠셨나요?"
            rows="3"
            max-rows="6"
            v-model="post.descript"
            :state="validateTextArea"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="validateTextArea" style="text-align:left;padding-left: 10px">
            해시태그 1개, 200자 미만의 내용이 필요합니다.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row style="padding: 10px">
        <b-col style="text-align:left;cursor: pointer;user-select: none;" v-on:click="post.visibility = (post.visibility == 'public' ? 'private' : 'public')">
          <template v-if="post.visibility == 'public'">
            <font-awesome-icon icon="globe-asia" style="margin-right: 5px"/>모든 사람이 볼 수 있습니다.
          </template>
          <template v-else>
            <font-awesome-icon icon="lock" style="margin-right: 5px"/>나만이 볼 수 있습니다.
          </template>
        </b-col>
      </b-row>
      <b-row align-h="between" style="padding: 0 0 5px">
        <b-col style="text-align:left;">
          <input type="file" ref="fileInput" id="filebtn" @change="uploadOnePhoto" style="display:none" accept="image/*"/>
          <b-button pill variant="outline-secondary"><font-awesome-icon icon="camera-retro" @click="$refs.fileInput.click()"/></b-button>
        </b-col>
        <b-col style="text-align:right;">
          <b-button pill variant="outline-secondary" :disabled="!validateForm">게시하기</b-button>
        </b-col>
      </b-row>
      <b-row style="padding: 0 0 5px">
        <b-col>
          <b-form-invalid-feedback :state="validateForm" style="text-align:left;padding-left: 10px">
            자세한 리뷰, 위치, 사진이 필요합니다.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
    </b-form>
    <!--<div class="form-floating">
      <textarea class="form-control" value="inputText" id="floatingTextarea" placeholder="내용입력" @keyup.#="hashE" enctype="multipart/form-data" style="resize:none; margin-bottom:5px"></textarea>
    </div>
    <div class="Buttons">
      <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
        <label class="btn btn-primary" pill variant="primary" for="filebtn">
        사진
        </label>
        <input type="file" ref="fileInput" id="filebtn" @change="uploadOnePhoto" style="display:none" accept="image/*" multiple/>
      </form>
      <button type="submit" class="btn btn-success" id="postbtn">확인</button>
    </div>-->
  </div>
</template>
<script>

export default {
  name: 'WritePostUI',
  props: {
    postProp: {
      type: Object,
      default: function () {
        return {
          docID: '',
          title: '',
          descript: '',
          date: '',
          profileImg: '',
          writer: '',
          good: 0,
          img: '',
          lat: 0,
          lot: 0,
          visibility: 'public',
          authorId: '',
          country: '',
          city: '',
          state: '',
          street: '',
          hashtag: null
        }
      }
    }
  },
  watch: {
    'post.descript': function (val) {
      const hashtag = val.match(/#([\p{L}]{2,50})/u)
      if (hashtag) {
        this.post.hashtag = hashtag[0]
      }
    }
  },
  data () {
    return {
      inputText: '',
      isCropModal: false,
      hashTag: [],
      cropModal: {
        show: false,
        file: null
      },
      post: this.postProp
    }
  },
  methods: {
    uploadOnePhoto: function (e) {
      this.cropModal.show = false
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const maxSize = 3 * 1024 * 1024
        if (file.size <= maxSize) {
          this.$nextTick(() => {
            this.cropModal.show = true
            this.cropModal.file = file
            e.target.value = ''
          })
        } else {
          console.warn(`Maximum file size: ${maxSize}, current: ${file.size}`)
        }
      } else {
        console.warn('Empty file detected')
      }
    }
  },
  computed: {
    // https://stackoverflow.com/a/29743813/7270469
    validateTextArea: function () {
      const descriptRegex = this.post.descript.match(/^[\p{L}\t\n\r\s\\#]{2,200}$/u)
      console.log(descriptRegex, this.post.hashtag)
      return descriptRegex != null && this.post.hashtag != null
    },
    validateForm: function () {
      return false
    }
  }
}
</script>
<style scoped>
#form-control{
    resize : none;
    margin-bottom : 5px;
    height:50%;
    position : relative;
}

.postbtn{
  padding: 6px 25px;
  background-color:#FF6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.form-box {
  background-color:white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

textarea {
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  outline: none;
}
input:focus, textarea:focus, select:focus{
    outline: none;
    border: 0 none #FFF;
}
</style>
