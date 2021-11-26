<template>
    <div id="searchOptionBar">
        <b-row>
            <b-col cols="4" md="2" class="option-col" v-if="eanblePublicOrPrivate">
                <font-awesome-icon icon="globe-asia" class="icon-btn" @click="publicOrPrivate = 'public'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(publicOrPrivate, 'public')}"/>
                <font-awesome-icon icon="lock" class="icon-btn" @click="publicOrPrivate = 'private'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(publicOrPrivate, 'private')}"/>
            </b-col>
            <b-col cols="4" md="2" class="option-col" v-if="eanbleSortByGoodOrDate">
                <font-awesome-icon icon="heart" class="icon-btn" @click="sortByGoodOrDate = 'good'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(sortByGoodOrDate, 'good')}"/>
                <font-awesome-icon icon="history" class="icon-btn" @click="sortByGoodOrDate = 'date'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(sortByGoodOrDate, 'date')}"/>
            </b-col>
            <b-col cols="4" md="2" class="option-col" v-if="eanbleShowAreaOrGlobaly">
                <font-awesome-icon icon="map-marked" class="icon-btn" @click="showAreaOrGlobaly = 'area'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(showAreaOrGlobaly, 'area')}"/>
                <font-awesome-icon icon="map" class="icon-btn" @click="showAreaOrGlobaly = 'global'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(showAreaOrGlobaly, 'global')}"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'SearchOptionBar',
    props: {
        eanblePublicOrPrivate: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        eanbleSortByGoodOrDate: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        eanbleShowAreaOrGlobaly: {
            type: Boolean,
            default: function () {
                return true
            }
        }
    },
    data () {
        return {
            msg: 'hello world',
            publicOrPrivate: 'public',
            sortByGoodOrDate: 'good',
            showAreaOrGlobaly: 'area'
        }
    },
    methods: {
        opacityCondition: function (val, str) {
            return val === str ? '1' : '0.5'
        },
        emitOptionChanged: function () {
            this.$emit('on-option-changed', {
                publicOrPrivate: this.publicOrPrivate,
                sortByGoodOrDate: this.sortByGoodOrDate,
                showAreaOrGlobaly: this.showAreaOrGlobaly
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#searchOptionBar {
    border-radius: 8px;
    background-color: #EEEEEE;
    margin-bottom: 10px;
}

.option-col {
    padding: 8px 24px;
    text-align:left;
}

.icon-btn {
    margin-right:15px;
    cursor:pointer;
}
</style>
