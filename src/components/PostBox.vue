<template>
  <div id="postbox">
    <div class="thumbnail-img" v-bind:style="{ backgroundImage: 'url(' + postItem.img + ')'}">
        <template v-if="$firebaseAuth && $firebaseAuth.getCurrentUserUid() && $firebaseAuth.getCurrentUserUid() === postItem.authorId">
            <b-row style="padding: 0 15px">
                <b-col>
                    <b-button pill variant="outline-secondary" @click="onBtnUpdateClicked()"><font-awesome-icon icon="edit" style="margin-right: 5px"/></b-button>
                </b-col>
                <b-col style="text-align:right">
                    <b-button @click="showUpDeleteCheckModal()" pill variant="outline-secondary"><font-awesome-icon icon="trash" style="margin-right: 5px"/></b-button>
                </b-col>
            </b-row>
        </template>
    </div>
    <div>
        <h4>{{postItem.hashtag}}</h4>
        <p>{{ cutDescript }}</p>
        <div class="text-date">{{postItem.date}}</div>
        <hr>
        <div class="footer">
            <img class="profile-img" :src="postItem.profileImg"/>
            <span class="writer">by <span class="bold">{{postItem.writer}}</span></span>
            <b-icon icon="heart-fill" class="gap_margin_5px_horizontal"
                    :variant="postItem.goodMarked ? 'danger' : ''"
                    v-on:click="[onGoodBtnClicked(postItem), ture_not_liked()]"
            />
            <span class="good_num">{{postItem.good}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FirestoreDao from '../module/firestore.dao'
import {EventBus} from '../lib/event-bus.js'
export default {
  name: 'postbox',
  props: {
      post: {
          type: Object,
          default: function () {
              return {
                  docID: '',
                  title: 'Undefined',
                  descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                  date: '----년 --월 --일',
                  profileImg: '../assets/logo.png',
                  writer: 'unknown',
                  good: 0,
                  img: '../assets/logo.png',
                  hashtag: ''
              }
          }
      }
  },
  data () {
    return {
        postItem: this.post,
        currentMode: this.mode,
        liked: false,
        firestoreDao: new FirestoreDao()
    }
  },
  computed: {
      cutDescript: function () {
          if (this.postItem && this.postItem.descript && this.postItem.descript.length >= 200) {
              return `${this.postItem.descript.slice(0, 197)}...`
          } else if (this.postItem && !this.postItem.descript) {
              return '본문이 비어있습니다.'
          }
          return this.postItem.descript
      }
  },
  methods: {
        onGoodBtnClicked: function (post) {
            if (post.goodMarked) {
                this.decrease()
            } else {
                this.increase()
            }
        },
        onBtnUpdateClicked: function () {
            Vue.prototype.$notify.$emit('onFocusedPostChanged', this.post)
        },
        showUpDeleteCheckModal: function () {
            // this.$bvModal.show('deleteCheck-modal')
            this.$bvModal.msgBoxConfirm('게시물을 삭제하시겠습니까?', {
                title: ' ',
                okTitle: '확인',
                cancelTitle: '취소',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                hideHeaderClose: false
            }).then(value => {
                if (value === true) {
                    this.deleteHandleOk()
                } else {
                    this.$bvModal.hide()
                }
            })
        },
        deleteHandleOk (bvModalEvt) {
        this.$bvModal.msgBoxOk('게시물 삭제 완료', {
            title: ' ',
                okTitle: '확인',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                hideHeaderClose: true
        })
        .then(value => {
            this.onBtnDeleteClicked()
        })
        },
        onBtnDeleteClicked: function () {
            this.$bvModal.hide('deleteSuccess-modal')
            this.firestoreDao.deletePost(this.postItem.docID)
            .then(() => {
                Vue.prototype.$notify.$emit('Need refresh')
            })
            .catch(err => {
                console.error(`[PostBox] [onBtnDeleteClicked] Error: ${err.message}`)
            })
        },
        increase: function () {
           this.firestoreDao.thumbsUpPost(this.postItem.docID, Vue.prototype.$firebaseAuth.getCurrentUserUid())
           .then(() => {
                this.postItem.good++
                this.postItem.goodMarked = true
           })
           .catch(err => {
               console.error(`[PostBox] [increase] Error: ${err.message}`)
           })
        },
        decrease: function () {
           this.firestoreDao.thumbsDownPost(this.postItem.docID, Vue.prototype.$firebaseAuth.getCurrentUserUid())
           .then(() => {
                this.postItem.good--
                this.postItem.goodMarked = false
           })
           .catch(err => {
               console.error(`[PostBox] [decrease] Error: ${err.message}`)
           })
        },
        ture_not_liked: function () {
           this.liked === true ? this.liked = false : this.liked = true
           console.log('데이터 보냅니다: ', this.liked)
           EventBus.$emit('use-eventBus', this.liked)
           return this.liked
        }
    },
       greet: function (mode) {
           this.currentMode === 'grid' ? this.currentMode = '' : this.currentMode = 'grid'
       }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#postbox {
    width: 100%;
    margin: 5px;
    border-radius: 10px;
    background-color: white;
    padding: 0 0px 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: .4s;
    text-align: left;
}
#postbox div {
    padding: 5px 5px;
}
#postbox:hover {
    transform: translate(0, -30px);
}
.thumbnail-img {
    width: 100%;
    height: 150px;
    background-image: url('../assets/logo.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
}
.profile-img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
}

p {
    height: 100px;
    overflow:hidden;
    text-overflow:ellipsis;
    overflow-wrap: break-word;
    word-break: break-all;
}

h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.text-date {
    font-size: 0.9em;
}

.footer {
    display: flex;
    flex-direction: row;
}

.writer {
    flex-grow: 1;
    margin-left: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.writer .bold {
    font-weight: bold;
}

.gap_margin_5px_horizontal {
    margin: 0 5px;
}

.good_num {
    margin: 0 5px;
}

.gap_margin_5px_horizontal:hover {
    color:palevioletred;
}
button > svg {
    margin: 0 !important;
}
</style>
