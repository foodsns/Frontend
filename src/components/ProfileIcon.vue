<template>
  <div id="profileicon">
    <img v-if="profileImg" :src="profileImg" @click="toggleDropdown = !toggleDropdown"/>
    <!--<b-button class="logoutBtn" v-show="isLogin" v-on:click="firebaseSignOut" size="sm">로그아웃</b-button>-->
    <div v-if="profileImg && toggleDropdown" class="drop-down">
        <div @click="firebaseSignOut"><span>로그아웃</span><span><font-awesome-icon icon="sign-out-alt" style="margin-left: 5px;"/></span></div>
    </div>
    <div v-if="!profileImg" v-on:click="onSignInUpClicked">
        <span>Sign in / up</span><font-awesome-icon icon="sign-in-alt" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import app from '../firebaseApp'
import Vue from 'vue'
export default {
    name: 'ProfileIcon',
    data () {
        return {
            msg: 'hello world',
            profileImg: Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.currentUser ? Vue.prototype.$firebaseAuth.currentUser.photoURL : '',
            isLogin: Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.currentUser,
            toggleDropdown: false
        }
    },
    mounted () {
        if (Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.eventBus) {
            Vue.prototype.$firebaseAuth.eventBus.$on('onAuthStateChanged', (isLoggedIn) => {
                if (isLoggedIn && Vue.prototype.$firebaseAuth.currentUser) {
                    this.profileImg = `${Vue.prototype.$firebaseAuth.currentUser.photoURL}`
                    this.isLogin = true
                } else {
                    this.profileImg = ''
                    this.isLogin = false
                }
            })
        }
    },
    methods: {
        onSignInUpClicked: function () {
            this.$router.push('/login')
        },
        firebaseSignOut: function () {
            Vue.prototype.$firebaseAuth.signOut()
            this.toggleDropdown = false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
}
div {
    cursor: pointer;
}
div span {
    margin-right: 5px;
}
div.drop-down {
    position: absolute;
    right: -2px;
    width: 125px;
    z-index: 9999;
    margin-top: 12px !important;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
}

div.drop-down div {
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
