<template>
<div>
    <b-button  v-on:click="showlist" class="goodlist-btn" pill variant="outline-danger">
        <b-icon icon="heart-fill" ></b-icon> LIST
    </b-button>
</div>
</template>

<script>
export default {
    name: 'likelist-btn',
    data () {
        return {
        }
    },
    methods: {
        showlist: function () {
            this.$router.push('goodlist')
            }

        }
}

</script>

<style scoped>

.goodlist-btn{
    position : fixed;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
    }

</style>
