<template>
    <div id="scroll-gap" ref="gap" v-bind:style="{ height: '' + gap + 'px'}">
    </div>
</template>

<script>
export default {
    name: 'InfiniteScrollGap',
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
        thresholdProp: {
            type: Number,
            default: function () {
                return 0
            }
        }
    },
    data () {
        return {
            gap: 0
        }
    },
    mounted () {
        // clientHeight + threshold < scrollHeight
        console.log(`[InfiniteScrollGap] [mounted]`, this.clientHeight, this.scrollHeight, this.thresholdProp)
        console.log(`testing`, this.$refs.gap)
        console.log('y', this.$refs.gap.getBoundingClientRect().y)
        this.gap = Math.abs((this.clientHeight + this.thresholdProp) - this.$refs.gap.getBoundingClientRect().y)
        console.log('gap', (this.clientHeight + this.thresholdProp), this.gap)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
