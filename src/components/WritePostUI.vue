<template>
  <div id="writePostUI" style="position: relative">
    <crop-modal v-if="cropModal.show" v-bind:fileProp="cropModal.file" @updatefileProp="updatefileProp"></crop-modal>
    <b-form @submit.stop.prevent class="form-box">
      <b-row v-if="post.img" style="padding: 0 15px 15px;">
        <b-col class="img-preview" v-bind:style="{ backgroundImage: 'url(' + post.img + ')'}">
        </b-col>
      </b-row>
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
          <input type="file" ref="fileInput" id="filebtn" @change="onFileChanged" style="display:none" accept="image/*"/>
          <span>
            <b-button pill variant="outline-secondary" @click="$refs.fileInput.click()" :disabled="uploadProcessing"><font-awesome-icon icon="camera-retro"/></b-button>
          </span>
          <span><user-gps-logo ref="userGps" @location="onGpsAddrLoaded" @err-msg="onGpsAddrFailed"></user-gps-logo></span>
          <span v-if="!addrEditExpand" @click="addrEditExpand = !addrEditExpand"><font-awesome-icon icon="sort-down" style="margin: 5px 0; width: 32px;cursor: pointer"/></span>
          <span v-else-if="addrEditExpand" @click="addrEditExpand = !addrEditExpand"><font-awesome-icon icon="sort-up" style="width: 32px;cursor: pointer"/></span>
        </b-col>
        <b-col style="text-align:right;">
          <b-button pill variant="outline-warning" @click="onCancelBtnClicked()">취소</b-button>
          <b-button pill variant="outline-secondary" :disabled="!validateForm || submitProcessing" @click="onSubmit()">게시하기</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="text-align:left;padding-left: 15px">
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
              <span style="margin-right:2px">{{post.city}}</span>
              <span style="margin-right:2px">{{post.state}}</span>
              <span style="margin-right:2px">{{post.street}}</span>
            </template>
          <template v-if="gpsAddrFailMsg">
            <div>
              <span style="color:red">{{gpsAddrFailMsg}}</span>
            </div>
          </template>
        </b-col>
      </b-row>
      <b-row style="padding: 0 0 5px">
        <b-col>
          <b-form-invalid-feedback :state="validateForm" style="text-align:right;padding-left: 10px">
            자세한 리뷰, 위치, 사진이 필요합니다.
          </b-form-invalid-feedback>
          <b-form-invalid-feedback :state="unAddress" style="text-align:right;padding-left: 10px">
            위치정보가 필요합니다.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row style="padding: 0 0 5px" v-if="errorMsg">
        <b-col style="text-align:left;padding-left: 10px;color:red">
        {{errorMsg}}
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
import Vue from 'vue'
import FirebaseStorage from '../module/firebaseStorage.controller'
import FirestoreDao from '../module/firestore.dao'
export default {
  name: 'WritePostUI',
  props: {
    postProp: {
      type: Object,
      default: function () {
        return {
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
        }
      }
    }
  },
  watch: {
    'post.descript': function (val) {
      const hashtag = val.match(/#([\p{L}]{2,50})/u)
      if (hashtag) {
        this.post.hashtag = hashtag[0]
      } else {
        this.post.hashtag = null
      }
    },
    post: function (val) {
      console.log('current post', val)
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
      post: this.postProp,
      gpsAddrFailMsg: null,
      fullAddr: null,
      addrEdit: false,
      addrEditExpand: false,
      isLoggedIn: false,
      firebaseStorageInstance: new FirebaseStorage(),
      firestoreDao: new FirestoreDao(),
      uploadProcessing: false,
      submitProcessing: false,
      errorMsg: '',
      file: null
    }
  },
  mounted () {
    if (Vue.prototype.$notify) {
      Vue.prototype.$notify.$on('onFocusedPostChanged', post => {
        this.post = post
      })
    }
  },
  methods: {
    onCancelBtnClicked: function () {
      this.post = {
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
        }
    },
    onSubmit: function () {
      this.submitProcessing = true
      const docID = this.firestoreDao.getDocumentID()
      if (this.file) {
        this.uploadFileToServer(docID, this.file)
        .then(url => {
          this.post.img = url
          const currentUser = Vue.prototype.$firebaseAuth.currentUser
          this.post.authorId = currentUser.uid
          this.post.profileImg = currentUser.photoURL
          this.post.writer = currentUser.displayName
          return this.post.docID ? this.firestoreDao.updatePost(this.post) : this.firestoreDao.insertPost({
            ...this.post
          }, docID)
        })
        .then(result => {
          console.log('result', result)
          this.showUploaSuccessdModal()
          this.onCancelBtnClicked() // 임시 초기화
          this.$emit('submit-success')
          this.$nextTick(() => {
            this.submitProcessing = false
            this.file = null
            this.errorMsg = ''
          })
        })
        .catch(err => {
          console.log('[WritePostUI] [onSubmit] Error: ', err.message)
          this.errorMsg = '게시물 업로드 중 문제가 발생하였습니다.'
          this.$nextTick(() => {
            this.submitProcessing = false
            this.file = null
          })
        })
      } else if (this.post.docID) {
        const currentUser = Vue.prototype.$firebaseAuth.currentUser
        this.post.authorId = currentUser.uid
        this.post.profileImg = currentUser.photoURL
        this.post.writer = currentUser.displayName
        this.firestoreDao.updatePost(this.post)
        .then(result => {
          console.log('result', result)
          this.$emit('submit-success')
          this.$nextTick(() => {
            this.submitProcessing = false
            this.errorMsg = ''
          })
        })
        .catch(err => {
          console.log('[WritePostUI] [onSubmit] Error: ', err.message)
          this.errorMsg = '게시물 업로드 중 문제가 발생하였습니다.'
          this.$nextTick(() => {
            this.submitProcessing = false
          })
        })
      }
    },
    uploadOnePhoto: function (file) {
      this.$nextTick(() => {
        this.cropModal.show = true
        this.cropModal.file = file
      })
    },
    generateFileLocalUrl: function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.onerror = (err) => {
          reject(err)
        }
        reader.readAsDataURL(file)
      })
    },
    onFileChanged: function (e) {
      this.cropModal.show = false
      if (e.target.files && e.target.files.length > 0) {
        this.file = e.target.files[0]
        const maxSize = 10 * 1024 * 1024
        if (this.file.size <= maxSize) {
          this.$nextTick(() => {
            this.uploadOnePhoto(this.file)
            // this.uploadFileToServer(file)
            // this.generateFileLocalUrl(this.file)
            // .then(url => {
            //   this.post.img = url
            // })
            // .catch(err => {
            //   console.error(`[WritePostUI] [onFileChanged] Error: ${err.message}`)
            //   this.errorMsg = '이미지 불러오는 중 문제가 발생하였습니다.'
            // })
            e.target.value = ''
            this.errorMsg = ''
          })
        } else {
          console.warn(`Maximum file size: ${maxSize}, current: ${this.file.size}`)
          this.errorMsg = '이미지 용량이 10MB 제한을 넘었습니다.'
        }
      } else {
        console.warn('Empty file detected')
      }
    },
    uploadFileToServer: function (docID, file) {
      this.uploadProcessing = true
      return this.firebaseStorageInstance.uploadFile(docID, file)
      .then(url => {
        this.uploadProcessing = false
        return url
      })
      .catch(err => {
        this.uploadProcessing = false
        console.error(`[WritePostUI] [uploadFileToServer] Error: ${err.message}`)
        this.errorMsg = '이미지 업로드 중 문제가 발생하였습니다.'
      })
    },
    onGpsAddrLoaded: function (location) {
      this.post.country = '대한민국'
      this.post.city = location.addr1
      this.post.state = location.addr2
      this.post.street = location.addr3
      this.post.lat = location.lat
      this.post.lot = location.lot
      this.fullAddr = `${this.post.city} ${this.post.state} ${this.post.street}`
    },
    onGpsAddrFailed: function (errMsg) {
      this.gpsAddrFailMsg = errMsg
    },
    updatefileProp: function (file) {
      this.post.img = file
      this.cropModal.show = false
    },
    showUploaSuccessdModal: function () {
        this.$bvModal.msgBoxOk('게시물 업로드 완료', {
          title: ' ',
          size: 'md',
          okTitle: '확인',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0'
        })
      }
  },
  computed: {
    // https://stackoverflow.com/a/29743813/7270469
    validateTextArea: function () {
      const descriptRegex = this.post.descript.match(/^[\p{L}\t\n\r\s\\#,.><~!?@#$%^&*()-=+|]{2,200}$/u)
      // console.log(descriptRegex, this.post.hashtag)
      return descriptRegex != null && this.post.hashtag != null
    },
    validateAddress: function () {
      return this.post.country &&
              this.post.city &&
              this.post.state &&
              this.post.street &&
              (this.post.lat >= -90 && this.post.lat <= 90) &&
              (this.post.lot >= -180 && this.post.lot <= 180)
    },
    validateForm: function () {
      return this.validateTextArea && this.validateAddress && this.validateAuth && this.post.img != null
    },
    validateAuth: function () {
      return Vue.prototype.$firebaseAuth.getCurrentUserUid()
    },
    unAddress: function () {
      return this.validateAddress != null
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
input[type=text] {
  border: 0;
  outline: 0;
  border-bottom: 2px solid #212529;
}
div.input-group-append > button{
  border-color: transparent;
}

.img-preview {
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
