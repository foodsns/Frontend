<template>
  <div id="profileicon">
    <img v-if="profileImg" :src="profileImg" v-on:click="firebaseSignOut"/>
    <div v-else v-on:click="onSignInUpClicked">
        <span>Sign in / up</span><font-awesome-icon icon="sign-in-alt" />
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
export default {
    name: 'ProfileIcon',
    data () {
        return {
            msg: 'hello world',
            profileImg: ''
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
