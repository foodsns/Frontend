import Vue from 'vue'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export default class FirebaseAuth {
    currentUser = null
    eventBus = new Vue()

    constructor () {
        this.onAuthStateChangedListener()
    }

    getCurrentUserUid () {
        return this.currentUser ? this.currentUser.uid : null
    }

    googleSignUp () {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        return signInWithPopup(auth, provider)
        .then((result) => {
            console.log(`[firebaseAuth] [googleSignUp] Sign up successfully`)
            return result
        }).catch((error) => {
            console.error('[firebaseAuth] [googleSignUp]: error', error)
        })
    }

    signOut () {
        const auth = getAuth()
        return signOut(auth).then(() => {
        // Sign-out successful.
            console.log('[firebaseAuth] [signOut] Successfully signed out')
            return true
        }).catch((error) => {
        // An error happened.
            console.error('[firebaseAuth] [signOut]: error', error)
        })
    }

    onAuthStateChangedListener () {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('[firebaseAuth] [onAuthStateChangedListener] User state changed to signed in')
                this.currentUser = user
                this.eventBus.$emit('onAuthStateChanged', true)
            } else {
                // User is signed out
                // ...
                console.log('[firebaseAuth] [onAuthStateChangedListener] User not signed in')
                this.currentUser = null
                this.eventBus.$emit('onAuthStateChanged', false)
            }
        })
    }
}
