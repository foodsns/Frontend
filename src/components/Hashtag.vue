<template>
 <!-- https://www.creative-tim.com/vuematerial/components/chips -->
<div class="box">
    <md-chip v-for = "hash in form(object)" :key="hash.id" class="md-primary" md-deletable md-clickable>{{hash}}</md-chip>
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
    mounted () {
        // this.form(this.postList)
    },
    computed: {

    },
    methods: {
        form: function (postList) {
            for (let i = 0; i < this.postList.length; i++) {
                this.object.hashtag[i] = this.postList[i].hashtag
            }
            return [...new Set(this.object.hashtag)]
        }
    },
    data () {
            return {
                postList: this.postListProps,
                object: {
                    hashtag: [],
                    count: 0
                }
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
