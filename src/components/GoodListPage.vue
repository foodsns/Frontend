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
                    <search-option-bar></search-option-bar>
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
                {
                    id: '993915c4-878b-4486-b9a8-052971a9620d',
                    title: '서울 시청',
                    descript: '2012년에 세운 정부의 현대적인 명소로, 1925년에 지었으며 현재는 도서관이 된 옛 시청 건물 옆에 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 1,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Seoul_City_Hall_20190608_001.jpg',
                    lat: 37.566543,
                    lot: 126.978421
                },
                {
                    id: '525d7948-d35a-4104-8cbb-ab70f0ced1d1',
                    title: '덕수궁',
                    descript: '서울의 심장부에 있는 유서 깊은 궁전으로 왕궁수문장 교대 의식을 볼 수 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 2,
                    img: 'https://www.heritage.go.kr/images/content/palaces/pd_pic01.jpg',
                    lat: 37.565772,
                    lot: 126.975160
                },
                {
                    id: '9758a109-3adc-4dc3-a50c-d25afa839e05',
                    title: '시청역',
                    descript: '서울 시청역',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 3,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/%EC%8B%9C%EC%B2%AD%EC%97%AD_%EC%97%AD%EB%AA%85%ED%8C%90%282%ED%98%B8%EC%84%A0%29.JPG',
                    lat: 37.565559,
                    lot: 126.977173
                },
                {
                    id: '5895722f-f12a-4572-9260-888b5b3e2072',
                    title: '미국대사관저',
                    descript: '미국대사관저',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 4,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/USA_Embassy_Building_in_Seoul.jpg/270px-USA_Embassy_Building_in_Seoul.jpg',
                    lat: 37.566940,
                    lot: 126.972958
                },
                {
                    id: '9a9b35a1-d737-4c32-ad1d-0c9329bbd717',
                    title: '동화면세점',
                    descript: '동화면세점',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 5,
                    img: 'https://ir.dwdfs.com/images/sub/about-ceo-visual.jpg',
                    lat: 37.569586,
                    lot: 126.976187
                },
                {
                    id: '26ddb129-3643-4836-bd99-7c56e6f5fd91',
                    title: '주한 콜롬비아 대사관',
                    descript: '주한 콜롬비아 대사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 6,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Bogot%C3%A1_embajada_de_Corea_del_Sur.JPG/270px-Bogot%C3%A1_embajada_de_Corea_del_Sur.JPG',
                    lat: 37.570936,
                    lot: 126.977952
                },
                {
                    id: '83775fa5-97b0-4dde-92f5-7721d52de1eb',
                    title: 'KT광화문지사',
                    descript: 'KT광화문지사',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 7,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_South_Korea_on_building.jpg/300px-Flag_of_South_Korea_on_building.jpg',
                    lat: 37.572008,
                    lot: 126.977951
                },
                {
                    id: 'ae3f053e-e0d4-486b-af6e-3d6138d426f9',
                    title: '구 러시아공사관',
                    descript: '구 러시아공사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 8,
                    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Former_Russia_legation_of_Korea_01.JPG/272px-Former_Russia_legation_of_Korea_01.JPG',
                    lat: 37.568178,
                    lot: 126.971474
                }
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
            }
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
