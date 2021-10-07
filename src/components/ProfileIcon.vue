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
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
export default {
    name: 'ProfileIcon',
    data () {
        return {
            msg: 'hello world',
            profileImg: '',
            isLogin: false
        }
    },
    mounted () {
        this.authStateChangeListener()
    },
    methods: {
        authStateChangeListener: function () {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('[ProfileIcon] [authStateChangeListener] user:', user)
                    this.profileImg = user.photoURL
                    this.isLogin = true
                } else {
                    // User is signed out
                    // ...
                    console.log('[ProfileIcon] [authStateChangeListener] User not signed in')
                }
            })
        },
        onSignInUpClicked: function () {
            this.$router.push('/login')
        },
        firebaseSignOut: function () {
            const auth = getAuth()
            signOut(auth).then(() => {
            // Sign-out successful.
                console.log('[GoogleSign] [firebaseSignOut]: auth', auth)
                this.profileImg = ''
                this.isLogin = false
            }).catch((error) => {
            // An error happened.
                console.log('[GoogleSign] [firebaseSignOut]: error', error)
            })
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
