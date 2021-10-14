<template>
  <div id="profileicon">
    <img v-if="profileImg" :src="profileImg" />
    <b-button class="logoutBtn" v-show="isLogin" v-on:click="firebaseSignOut" size="sm">로그아웃</b-button>
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
            isLogin: Vue.prototype.$firebaseAuth && Vue.prototype.$firebaseAuth.currentUser
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

</style>
