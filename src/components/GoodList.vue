<template>
<div>
    <b-button  :disabled="!validateForm" v-on:click="[on(), showlist()] " class="goodlist-btn" pill variant="outline-danger" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
        <b-icon icon="heart-fill" ></b-icon>
    </b-button>
</div>
</template>

<script>
import {EventBus} from '../lib/event-bus.js'
import Vue from 'vue'

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
    },
    computed: {
        validateForm: function () {
            if (Vue.prototype.$firebaseAuth.getCurrentUserUid() != null) {
                console.log('abc')
                return 1
            } else {
                console.log('1234')
                return 0
            }
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
