<template>
    <div id="googlesign">
        <b-button variant="outline-danger" v-on:click="onGoogleSignInUpBtnClicked()">
            <font-awesome-icon :icon="['fab', 'google']" /> Google Sign in / up
        </b-button>
    </div>
</template>

<script>
import Vue from 'vue'
import FirestoreDao from '../module/firestore.dao'
export default {
    name: 'GoogleSign',
    data () {
        return {
            msg: 'hello world',
            firestoreDao: new FirestoreDao()
        }
    },
    mounted () {
        Vue.prototype.$firebaseAuth.eventBus.$on('onAuthStateChanged', (isLoggedIn) => {
            this.$emit('sign-state', isLoggedIn)
        })
    },
    methods: {
        onGoogleSignInUpBtnClicked: function () {
            Vue.prototype.$firebaseAuth.googleSignUp()
            .then(result => result.user)
            .then(user => {
                const {
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    uid
                } = user

                return this.firestoreDao.signUpMyInfo({
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    uid
                })
            })
            .then(result => {
                console.log(`[GoogleSign] [onGoogleSignInUpBtnClicked.signUpMyInfo] result: `, result)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
