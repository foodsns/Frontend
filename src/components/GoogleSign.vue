<template>
    <div id="googlesign">
        <b-button variant="outline-danger" v-on:click="onGoogleSignInUpBtnClicked"><font-awesome-icon :icon="['fab', 'google']" /> Google Sign in / up</b-button>
    </div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
export default {
    name: 'GoogleSign',
    data () {
        return {
            msg: 'hello world'
        }
    },
    mounted () {
        this.authStateChangeListener()
    },
    methods: {
        onGoogleSignInUpBtnClicked: function () {
            const provider = new GoogleAuthProvider()
            const auth = getAuth()
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log('result', GoogleAuthProvider.credentialFromResult(result))
                // ...
            }).catch((error) => {
                console.log('err', error)
            })
        },
        firebaseSignOut: function () {
            const auth = getAuth()
            signOut(auth).then(() => {
            // Sign-out successful.
                console.log('[GoogleSign] [firebaseSignOut]: auth', auth)
            }).catch((error) => {
            // An error happened.
                console.log('[GoogleSign] [firebaseSignOut]: error', error)
            })
        },
        authStateChangeListener: function () {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log('[GoogleSign] [authStateChangeListener] user:', user)
                    this.$emit('sign-state', true)
                } else {
                    // User is signed out
                    // ...
                    console.log('[GoogleSign] [authStateChangeListener] User not signed in')
                    this.$emit('sign-state', false)
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
