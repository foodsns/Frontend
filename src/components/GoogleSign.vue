<template>
    <div id="googlesign">
        <b-button variant="outline-danger" v-on:click="onGoogleSignInUpBtnClicked()">
            <font-awesome-icon :icon="['fab', 'google']" /> Google Sign in / up
        </b-button>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'GoogleSign',
    data () {
        return {
            msg: 'hello world'
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
