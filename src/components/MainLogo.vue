<template>
    <div class = "main-logo">
        <b-button class = "logo-img" pill variant="danger" v-on:click="greet()">메인로고입니다</b-button>
    </div>
</template>

<script>
export default {
    name: 'main-logo',
    methods: {
        greet: function () {
            //document.documentElement.scrollTop = 0
            //window.scrollTo(0, 0)
            //document.body.scrollTop = 0

            console.log('click')
        }
    }
}
</script>

<style scoped>
.main-logo {
    position: fixed;
    width: 100vw;
    padding-top: 60px;
    padding-bottom: 60px;
    background: goldenrod;
}
</style>
