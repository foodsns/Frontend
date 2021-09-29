<template>
    <div ref="infinitescroll" id="infinitescroll" v-bind:style="message ? `height: 50px` : `height: ${threshold}px`">
        <template v-if="clientHeight + threshold < scrollHeight && threshold > 100">
            <span v-if="appendHeightCalc">
                <font-awesome-icon icon="spinner" />
                <span class="txt">
                    새로운 리뷰가 있는지 찾아보는 중
                </span>
            </span>
            <span v-else-if="message">
                {{message}}
            </span>
            <span v-else>
                <font-awesome-icon icon="arrow-down" />
                <span class="txt">
                    아래로 내려 더 많은 리뷰를 확인하세요
                </span>
            </span>
        </template>
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
            },
            messageProp: {
                type: String,
                default: function () {
                    return ''
                }
            }
    },
    watch: {
        // clientHeight: function (val) {
        //     console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        // },
        // scrollHeight: function (val) {
        //     console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        // },
        // scrollTop: function (val) {
        //     console.log(`clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        //     const height = (this.clientHeight + this.scrollTop) - (this.scrollHeight - this.threshold)
        //     console.log(`ch + st >= sh - th == ${this.clientHeight + this.scrollTop} >= ${this.scrollHeight - this.threshold} : ${height}`)
        // },
        messageProp: function (val) {
            this.message = val
            console.log('?', this.message)
            // this.closeForce = true
        }
        // appendHeightCalc: function (conditional) {
        //     console.log(`appendHeightCalc: ${conditional}, emit: ${this.isEmitted}`)
        //     if (conditional) {
        //         this.isEmitted = true
        //     } else if (this.sclientHeight > this.scrollHeight) {
        //         this.isEmitted = false
        //     }
        //     return conditional
        // }
    },
    computed: {
        appendHeightCalc () {
            if (this.clientHeight > this.scrollHeight) {
                return false
            }
            const height = (this.clientHeight + this.scrollTop) - (this.scrollHeight - this.threshold)
            if (height >= this.threshold / 5 * 4 && !this.message) {
                console.log('[InfiniteScroll] [appendHeightCalc] Call need more')
                this.$emit('need-more')
                return true
            }
            return false
        }
    },
    data () {
        return {
            threshold: this.thresholdProp,
            message: this.messageProp
            // closeForce: false,
            // isEmitted: false,
            // ref: this.refProp
        }
    },
    methods: {
        // setIsEmitted (isEmitted) {
        //     this.isEmitted = isEmitted
        // }
    },
    mounted () {
        console.log(`[mounted] clientHeight: ${this.clientHeight}, scrollHeight: ${this.scrollHeight}, scrollTop: ${this.scrollTop}, threshold: ${this.threshold}`)
        console.log(this.message)

        // this.$nextTick(() => {
        //     this.refs.infinitescroll.addEventListener('transitionend', () => {
        //         console.log('?')
        //     })
        // })
        this.$refs.infinitescroll.addEventListener('transitionend', () => {
            // this.message = ''
            // console.log('return transitionend', this.$refs.mainboard, this.$refs.sidelist)
            // this.$refs.mainboard.scrollTop
            // this.ref.scrollTop -= this.threshold / 4 * 3
            // this.refsProp.forEach(ref => {
            //     ref.scrollTop -= this.threshold / 4 * 3
            // })
            // if (this.$refs.mainboard) {
            //     console.log('return to scroll up mainboard', this.$refs.mainboard.scrollTop)
            //     this.$refs.mainboard.scrollTop -= this.threshold / 4 * 3
            // }
            // if (this.$refs.sidelist) {
            //     console.log('return to scroll up sidelist', this.$refs.sidelist.scrollTop)
            //     this.$refs.sidelist.scrollTop -= this.threshold / 4 * 3
            // }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#infinitescroll {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.8s ease-out;
    margin-bottom: 100px;
}

#infinitescroll span {
    font-size: 1.1em;
}

.txt {
    margin-left: 15px;
}
</style>
