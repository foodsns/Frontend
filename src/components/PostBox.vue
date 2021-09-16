<template>
  <div id="postbox">
    <div class="thumbnail-img" v-bind:style="{ backgroundImage: 'url(' + postItem.img + ')'}"></div>
    <div>
        <h4>{{postItem.title}}</h4>
        <p>{{ cutDescript }}</p>
        <div class="text-date">{{postItem.date}}</div>
        <hr>
        <div class="footer">
            <img class="profile-img" :src="postItem.profileImg"/>
            <span class="writer">by <span class="bold">{{postItem.writer}}</span></span>
            <font-awesome-icon icon="heart" class="gap_margin_5px_horizontal" id="on" @click="greet"/>
            <span class="good_num">{{postItem.good}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postbox',
  props: {
      post: {
          type: Object,
          default: function () {
              return {
                  title: 'Undefined',
                  descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                  date: '----년 --월 --일',
                  profileImg: '../assets/logo.png',
                  writer: 'unknown',
                  good: 0,
                  img: '../assets/logo.png'
              }
          }
      }
  },
  data () {
    return {
        postItem: this.post
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
       greet: function (event) {
           var x = document.getElementById('on')
           x.style.color = 'red'
       }
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
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
    height: 150px;
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

.on {
    color: red;
}

</style>
