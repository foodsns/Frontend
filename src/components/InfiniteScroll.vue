<template>
  <div id="infinitescroll" v-bind:style="`height: ${threshold}px`">
    <span v-if="appendHeightCalc">Hello?</span>
    <span v-else>Bye</span>
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
            const height = (this.clientHeight + this.scrollTop) - (this.scrollHeight - this.threshold)
            console.log(`ch + st >= sh - th == ${this.clientHeight + this.scrollTop} >= ${this.scrollHeight - this.threshold} : ${height}`)
        }
    },
    computed: {
        appendHeightCalc: function () {
            if (this.sclientHeight > this.scrollHeight) {
                return false
            }
            const height = (this.clientHeight + this.scrollTop) - (this.scrollHeight - this.threshold)
            if (height >= this.threshold / 4 * 3) {
                return true
            }
            return false
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
#infinitescroll {
    display: flex;
    align-items: center;
    justify-content: center;
}

span {
    font-size: 2em;
}
</style>
