<template>
    <div ref="goodGrid" id="goodGrid">
        <b-container>
            <h4 v-show="value" class= "mx-auto">좋아요 누른 목록 표시</h4>
            <b-row style="margin-bottom: 20px;">
                <b-col style="text-align:left">
                    <b-button pill variant="outline-secondary" v-on:click="back()">
                        <font-awesome-icon icon="home"/>
                    </b-button>
                </b-col>
            </b-row>
            <b-row style="margin-bottom: 10px;">
                <b-col>
                    <search-option-bar
                        v-bind:eanblePublicOrPrivate="false"
                        v-bind:eanbleShowAreaOrGlobaly="false"
                        @on-option-changed="onSearchOptionChanged"></search-option-bar>
                </b-col>
            </b-row>
            <grid-board v-bind:postListProps="postList"/>
            <b-row>
                <b-col>
                    <infinite-scroll v-bind:clientHeight="clientHeight"
                                        v-bind:scrollHeight="scrollHeight"
                                        v-bind:scrollTop="scrollTop"
                                        v-bind:thresholdProp="threshold"
                                        v-bind:messageProp.sync="scrollMsg"
                                        @need-more="onScrollReachedBottom"></infinite-scroll>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Vue from 'vue'
import FirestoreDao from '../module/firestore.dao'
// import {EventBus} from '../lib/event-bus.js'
export default {
    props: ['liked'],
    components: {

    },
    data () {
        return {
            value: false,
            firestoreDao: new FirestoreDao(),
            postList: [
            ],
            clientHeight: 0,
            scrollHeight: 0,
            scrollTop: 0,
            threshold: 200,
            scrollMsg: '',
            isLoading: false
        }
    },
    mounted () {
        // this.selectMyThumbsUpPosts()
        this.$refs.goodGrid.addEventListener('resize', this.scrollHandler)
        this.$refs.goodGrid.addEventListener('scroll', this.scrollHandler)
        console.log('good', this.$refs.goodGrid)
        this.scrollHandler()
        this.searchPosts(true, false)
    },
    methods: {
        back: function () {
            this.$router.push('MainBoard')
        },
        scrollHandler () {
            if (this.$refs.goodGrid) {
                this.clientHeight = this.$refs.goodGrid.clientHeight
                this.scrollHeight = this.$refs.goodGrid.scrollHeight
                this.scrollTop = this.$refs.goodGrid.scrollTop
            } else {
                console.warn(`[GoodListPage] [scrollHandler] Undefined goodGrid ref`)
            }
            if (this.scrollMsg && this.clientHeight + this.scrollTop <= this.scrollHeight - this.threshold) {
                this.scrollMsg = ''
            }
        },
        selectMyThumbsUpPosts: function () {
            this.firestoreDao.selectMyThumbsUpPosts({
                lat: 37.566227,
                lot: 126.977966,
                distance: 1,
                sortByRecently: true,
                pageSize: 8,
                // country = null,
                // city = null,
                // state = null,
                // street = null,
                uid: Vue.prototype.$firebaseAuth.getCurrentUserUid()
            })
            .then(postList => {
                this.postList.splice(0)
                return postList
            })
            .then(_postList => {
                _postList.forEach(post => this.postList.push(post))
            })
        },
        onScrollReachedBottom () {
            console.log(`[GoodListPage] [onScrollReachedBottom] let's get more data`)
            if (!this.isLoading) {
                this.scrollMsg = ''
                this.isLoading = true
            // this.searchPosts(true, '대한민국', this.lastLoc.addr1, this.lastLoc.addr2, this.lastLoc.addr3, false)
                this.searchPosts(true, false)
            }
        },
        onSearchOptionChanged (currentSearchOption) {
            console.log(currentSearchOption)
        },
        searchPosts (isInfinite = false, forceUpdate = true) {
            this.firestoreDao.selectMyThumbsUpPosts({
                lat: 37.566227,
                lot: 126.977966,
                distance: 1,
                sortByRecently: true,
                pageSize: 8,
                // country = null,
                // city = null,
                // state = null,
                // street = null,
                uid: Vue.prototype.$firebaseAuth.getCurrentUserUid()
            })
            // https://stackoverflow.com/a/59289650/7270469
            .then(postList => {
                if (!isInfinite) {
                    this.postList.splice(0)
                }
                return postList
            })
            .then(_postList => {
                if (!_postList || _postList.length <= 0) {
                    this.scrollMsg = '더 이상 리뷰가 없어요'
                }
                _postList.forEach(post => this.postList.push(post))
                return true
            })
            .then(() => {
                this.isLoading = false
            })
        }
    }
}
</script>

<style scoped>

.back-btn{
    position : fixed;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
    }

#goodGrid {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding-top: 60px;
}
</style>
