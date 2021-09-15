<template>
    <div id="googlesign">
        <b-button variant="outline-danger"><font-awesome-icon :icon="['fab', 'google']" @click="onGoogleSignInUpBtnClicked"/> Google Sign in / up</b-button>
    </div>
</template>

<script>
export default {
    name: 'GoogleSign',
    data () {
        return {
            msg: 'hello world'
        }
    },
    methods: {
        onGoogleSignInUpBtnClicked: function () {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
