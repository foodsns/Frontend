<template>
<div>
    <h4 class= "mx-auto" >좋아요 누른 목록 표시</h4>
    <grid-board v-bind:postListProps="postList"/>
</div>
</template>

<script>
import GridBoard from './GridBoard.vue'
export default {
    components: {
        GridBoard
    },
    data () {
        return {
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
        }
            ]
        }
    }
}
</script>
