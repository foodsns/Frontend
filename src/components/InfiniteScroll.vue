<template>
  <div id="infinitescroll" v-bind:style="`height: ${threshold}px`">
    Hello?
  </div>
</template>

<script>
export default {
    name: 'InfiniteScroll',
    props: {
            clientHeight: {
                type: Number,
                default: function () {
                    return 0
                }
            },
            scrollHeight: {
                type: Number,
                default: function () {
                    return 0
                }
            },
            scrollTop: {
                type: Number,
                default: function () {
                    return 0
                }
            },
            thresholdProp: {
                type: Number,
                default: function () {
                    return 0
                }
            }
    },
    watch: {
        clientHeight: function (val) {
            console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        },
        scrollHeight: function (val) {
            console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        },
        scrollTop: function (val) {
            console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        }
    },
    data () {
        return {
            threshold: this.thresholdProp
        }
    },
    mounted () {
        console.log(`[mounted] clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
