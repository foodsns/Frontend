<template>
    <div id="testlabboard">
    </div>
</template>

<script>
export default {
    name: 'TestLabBoard',
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
                },
                {
                    id: '525d7948-d35a-4104-8cbb-ab70f0ced1d1',
                    title: '덕수궁',
                    descript: '서울의 심장부에 있는 유서 깊은 궁전으로 왕궁수문장 교대 의식을 볼 수 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 2,
                    img: 'http://www.deoksugung.go.kr/ko/assets/images/gallery/t3.jpg',
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
            ]
        }
    },
    watch: {
        $route (to, from) {
            this.runner(to.params.mode)
        }
    },
    mounted () {
        this.runner(this.$route.params.mode)
    },
    methods: {
        runner (mode) {
            switch (mode) {
                case 'map':
                    this.setDevMode()
                    this.setDummyPostList()
                break
                case 'release':
                    this.removeDummyPostList()
                    this.releaseDevMode()
                break
                default :
                    console.log(`[TestLabBoard] [runner] Undefined test mode ${mode}`)
                break
            }
        },
        setDevMode () {
            localStorage.setItem('dev', true)
        },
        setDummyPostList () {
            localStorage.setItem('postList', JSON.stringify(this.postList))
        },
        removeDummyPostList () {
            localStorage.removeItem('postList')
        },
        releaseDevMode () {
            localStorage.removeItem('dev')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
