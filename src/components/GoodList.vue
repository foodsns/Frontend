<template>
<div>
    <b-button
        v-b-tooltip.hover.topleft.v-danger title="좋아요 누른 게시물" placement = "bottom"
        v-on:click="[on(), showlist()] "
        class="goodlist-btn"
        pill variant="outline-danger"
        style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
        <b-icon icon="heart-fill" ></b-icon>
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
div {
    display: inline-block;
    margin-left: 5px;
}

</style>
