<template>
<div>
    <b-button  v-on:click="[on(), showlist()] " class="goodlist-btn" pill variant="outline-danger">
        <b-icon icon="heart-fill" ></b-icon> LIST
    </b-button>
</div>
</template>

<script>
import {EventBus} from '../lib/event-bus.js'
export default {
    name: 'likelist-btn',
    data () {
        return {
            value: false
        }
    },
    methods: {
        showlist: function () {
            this.$router.push('goodlist')
            },
        on: function () {
            EventBus.$on('use-eventBus', function (value) {
                this.value = value
                console.log('데이터 받습니다: ', value)
                return value
        })
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
