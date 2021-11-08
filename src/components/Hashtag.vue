<template>
 <!-- https://www.creative-tim.com/vuematerial/components/chips -->
<div class="box">
    <!-- <md-chips v-model="hashtag"></md-chips> -->
    <md-chip @click="click($event, hash)" v-for = "hash in form(this.postList)" :key="hash.id" class="md-primary" @md-delete="deleteHandler($event)" md-deletable md-clickable>{{hash[0]}}</md-chip>
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
    methods: {
        click: function (event, hash) {
            var hashvalue = event.target.textContent
            console.log(hashvalue)
            console.log(this.hashtag)
            // var index = (this.hashtag).findindex(i => i === hashvalue)
            var index = (this.hashtag).indexOf(hashvalue)
            console.log(index)
            if (index > -1) {
                this.hashtag.splice(index, 1)
            }
        },
        deleteHandler (event) {
            console.log(event)
        },

        form: function (postList) {
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
                hashtag: []
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
