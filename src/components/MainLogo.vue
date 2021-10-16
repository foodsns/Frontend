<template>
    <div>
        <img src="../assets/logo.jpeg" v-on:click="greet()">
    </div>
</template>

<script>
export default {
    name: 'main-logo',
    methods: {
        greet: function () {
            this.$emit('scrollMainboard')
        }
    }
}
</script>

<style scoped>
img {
    width: 48px;
    height: 48px;
    border-radius: 5px;
    position: fixed;
    left: calc(50vw - 24px);
    top: 12px;
    z-index: 1000;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
img:hover {
    transform: scale(1.2);
    transition: .4s;
}
</style>
