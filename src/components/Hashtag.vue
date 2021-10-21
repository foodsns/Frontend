<template>
 <!-- https://www.creative-tim.com/vuematerial/components/chips -->
<div class="box">
    <md-chip v-for = "hash in form(this.postList)" :key="hash.id" class="md-primary" md-deletable md-clickable>{{hash[0]}}</md-chip>
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
        form: function (postList) {
            for (let i = 0; i < this.postList.length; i++) {
                this.hashtag[i] = this.postList[i].hashtag
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
}

</style>
