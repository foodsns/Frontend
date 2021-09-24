<template>
    <div id="gridboard">
        <b-row v-if="!onlyOneLine">
            <b-col xxl="3" xl="4" lg="6" cols="12" class="b-col" v-for="(post, index) in postList" :key="index" :ref="prefix + post.id">
                <post-box v-bind:post="post" class="post-item"></post-box>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="12" class="b-col" v-for="(post, index) in postList" :key="index" :ref="prefix + post.id">
                <post-box v-bind:post="post" class="post-item"></post-box>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'GridBoard',
    props: {
        postListProps: {
            type: Array,
            default: function () {
                return []
            }
        },
        onlyOneLine: {
            type: Boolean,
            default: function () {
                return false
            }
        },
        focusedPostID: {
            type: String,
            default: function () {
                return null
            }
        }
    },
    watch: {
        focusedPostID: function (id) {
            if (id && this.$refs[this.prefix + id] && this.$refs[this.prefix + id].length > 0) {
                this.$refs[this.prefix + id][0].scrollIntoView()
            }
        }
    },
    data () {
        return {
            postList: this.postListProps,
            prefix: 'post-'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
