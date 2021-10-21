<template>
    <span id="shareaddr" v-if="fullAddr" style="background-color: white;cursor: pointer;
    border-radius: 5px;
    padding: 2px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"><span @click="copyToClipboard(`${host}?address=${fullAddr}`)" id="address-share">{{fullAddr}}
        <font-awesome-icon icon="share"/>
        </span>
        <b-tooltip target="address-share" triggers="click" placement="bottomright">
            복사되었습니다!
        </b-tooltip>
    </span>
</template>

<script>
export default {
    name: 'ShareAddr',
    props: {
        fullAddr: {
            type: String,
            default: function () {
                return null
            }
        }
    },
    data () {
        return {
            host: 'https://mogutsou.web.app/#/'
        }
    },
    watch: {
    },
    mounted () {
    },
    methods: {
        copyToClipboard: function (str) {
            const el = document.createElement('textarea')
            el.value = str
            el.setAttribute('readonly', '')
            el.style.position = 'absolute'
            el.style.left = '-9999px'
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
