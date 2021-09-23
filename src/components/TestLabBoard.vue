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
                    title: '서울 시청',
                    descript: '2012년에 세운 정부의 현대적인 명소로, 1925년에 지었으며 현재는 도서관이 된 옛 시청 건물 옆에 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 1,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipNV5Yhw_FPjQZjJIHuP7qHexF6Xf5L-WQiVOwQP=w426-h240-k-no',
                    lat: 37.5662952,
                    lot: 126.9757511
                },
                {
                    title: '덕수궁',
                    descript: '서울의 심장부에 있는 유서 깊은 궁전으로 왕궁수문장 교대 의식을 볼 수 있습니다.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 2,
                    img: 'https://lh4.googleusercontent.com/proxy/iXWBp-j7fRTrYU1NYIjo5ZR_gV0cQJUmSxXSZEavdqBGpiN_llGmFyKBBrGwt_tgV2ssACYGfZu3v8qM8AM6IgWizSphptS5ekVhbk5g613qIJlG1cYZv2lnS3-oSFuXKs9uZ8uk8LkdzpMM7E5kzCULN5EirMI=w438-h240-k-no',
                    lat: 37.5653575,
                    lot: 126.9737973
                },
                {
                    title: '시청역',
                    descript: '서울 시청역',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 3,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipM2LpBxqpI0LA4Joyfrsw2v9QoZkhBh7x_jbBoz=w408-h544-k-no',
                    lat: 37.5653574,
                    lot: 126.9737866
                },
                {
                    title: '미국대사관저',
                    descript: '미국대사관저',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 4,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipNLk6UTEICwua6OaWMv_p5yoEgGQlZmXwQGIXcP=w408-h306-k-no',
                    lat: 37.5670347,
                    lot: 126.9715391
                },
                {
                    title: '동화면세점',
                    descript: '동화면세점',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 5,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipOf32XPC20NngLmrE5pXvARaWG739YfNfU9WYDv=w408-h306-k-no',
                    lat: 37.569635,
                    lot: 126.973948
                },
                {
                    title: '주한 콜롬비아 대사관',
                    descript: '주한 콜롬비아 대사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 6,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipOQEUNavSYAzsvwEGOc1tfRpL7cLT2PqNRYtOb3=w408-h544-k-no',
                    lat: 37.5712125,
                    lot: 126.9757963
                },
                {
                    title: 'KT광화문지사',
                    descript: 'KT광화문지사',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 7,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png',
                    lat: 37.572357,
                    lot: 126.975124
                },
                {
                    title: '구 러시아공사관',
                    descript: '구 러시아공사관',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 8,
                    img: 'https://lh5.googleusercontent.com/p/AF1QipP6MopGbzD-G1ZyjsRS-QJdYORO0wGw-620RrQq=w408-h306-k-no',
                    lat: 37.567963,
                    lot: 126.969243
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
