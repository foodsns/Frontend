<template>
    <div id="searchOptionBar">
        <b-row>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="globe-asia" style="margin-right:15px;cursor:pointer;" @click="publicOrPrivate = 'public'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(publicOrPrivate, 'public')}"/>
                <font-awesome-icon icon="lock" style="margin-right:5px;cursor:pointer;" @click="publicOrPrivate = 'private'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(publicOrPrivate, 'private')}"/>
            </b-col>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="heart" style="margin-right:15px;cursor:pointer;" @click="sortByGoodOrDate = 'good'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(sortByGoodOrDate, 'good')}"/>
                <font-awesome-icon icon="history" style="margin-right:5px;cursor:pointer;" @click="sortByGoodOrDate = 'date'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(sortByGoodOrDate, 'date')}"/>
            </b-col>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="map-marked" style="margin-right:15px;cursor:pointer;" @click="showAreaOrGlobaly = 'area'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(showAreaOrGlobaly, 'area')}"/>
                <font-awesome-icon icon="map" style="margin-right:5px;cursor:pointer;" @click="showAreaOrGlobaly = 'global'; emitOptionChanged()"
                v-bind:style="{ opacity: opacityCondition(showAreaOrGlobaly, 'global')}"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'SearchOptionBar',
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
</style>
