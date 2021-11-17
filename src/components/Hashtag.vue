<template>
 <!-- https://www.creative-tim.com/vuematerial/components/chips -->
<div class="box">
    <!-- <md-chips v-model="hashtag"></md-chips> -->
    <md-chip @click="click($event, index)" v-for = "(hash, index) in renderHashtag" :key="hash.id" class="md-primary" @md-delete="deleteHandler($event)" md-deletable md-clickable>{{hash[0]}}</md-chip>
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
            const arr = this.form(this.postListProps)
            this.deletedHastagIdxList.forEach(idx => arr.splice(idx, 1))
            return arr
        }
    },
    methods: {
        click: function (event, index) {
            if (index > -1) {
                this.deletedHastagIdxList.push(index)
            }
        },
        deleteHandler (event) {
            console.log(event)
        },

        form: function (postList) {
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
                result_hashtag: [],
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
