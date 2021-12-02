<template>
 <!-- https://www.creative-tim.com/vuematerial/components/chips -->
<div v-if ="postList.length>0" class="box" v-intro ="'음식점 이름을 해시태그로 간편하게 확인해보세요.'">
    <md-chip @click= "clickHashtag($event)" v-for = "(hash, index) in renderHashtag" :key="hash.id" class="md-primary" @md-delete="deleteHashtag($event, index)" md-deletable md-clickable>{{hash[0]}}</md-chip>
</div>
<div v-else class="box"  >
    <md-chip @click= "clickHashtag($event)" md-deletable md-clickable>#해시태그</md-chip>
</div>
</template>

<script>
export default {
    name: 'Hashtag',
    props: {
        postListProps: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    watch: {
        postListProps: function (val) {
            this.deletedHastagIdxList.splice(0)
        }
    },
    computed: {
        renderHashtag: function () {
            const arr = this.getHashtag(this.postListProps)
            this.deletedHastagIdxList.forEach(idx => arr.splice(idx, 1))
            return arr
        }
    },
    methods: {
        deleteHashtag: function (event, index) {
            if (index > -1) {
                this.deletedHashtag = this.renderHashtag[index][0]
                this.$emit('deleteHashtag', this.deletedHashtag)
                this.deletedHastagIdxList.push(index)
                return this.deletedHashtag
            }
        },
        clickHashtag (event) {
            console.log(event)
        },

        getHashtag: function (postList) {
            this.hashtag = []
            for (let i = 0; i < postList.length; i++) {
                this.hashtag[i] = postList[i].hashtag
            }
            return this.getSortArr(this.hashtag)
        },
        getSortArr: function (array) {
            const counts = array.reduce((pv, cv) => {
            pv[cv] = (pv[cv] || 0) + 1
                return pv
            }, {})

            const result = []
            for (let key in counts) {
                result.push([key, counts[key]])
            }

            result.sort((first, second) => {
                return second[1] - first[1]
            })
                return result
            }
    },
    data () {
            return {
                postList: this.postListProps,
                hashtag: [],
                deletedHastagIdxList: []
            }
        }
}
</script>

<style scoped>
.box{
    /* border:1px solid;
    top: 200px;
    left: 10px;
    width : 300px;
    height : 100px; */
    padding: 15px;
    white-space: nowrap;
    overflow-x: auto;
}

</style>
