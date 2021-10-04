 <template>
<div>
     <b-container>
         <h4 v-show="value" class= "mx-auto">좋아요 누른 목록 표시</h4>
         <grid-board v-bind:postListProps="postList"/>
     </b-container>
     <div>
    <b-button  v-on:click="back()" class="back-btn" pill variant="outline-danger">
        <b-icon icon="arrow90deg-left" ></b-icon> Back
    </b-button>
</div>
</div>
</template>

<script>

// import {EventBus} from '../lib/event-bus.js'
export default {
    props: ['liked'],
    components: {

    },
    data () {
        return {
            value: false,
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
                }
            ]
        }
    },
    methods: {
        back: function () {
            this.$router.push('MainBoard')
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

</style>
