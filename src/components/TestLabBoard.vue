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
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
                },
                {
                    title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                    descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
                    date: '2021년 9월 4일',
                    profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                    writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                    good: 105,
                    img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
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
