<template>

<div class="box">
    <md-chip v-for = "post in postList" :key="post.id" class="md-primary" md-deletable md-clickable>{{post.hashtag}}</md-chip>
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
    method: {

    },
    data () {
            return {
                postList: this.postListProps
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
