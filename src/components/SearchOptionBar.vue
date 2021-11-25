<template>
    <div id="searchOptionBar">
        <b-row>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="globe-asia" style="margin-right:15px;cursor:pointer;" @click="publicOrPrivate = 'public'"
                v-bind:style="{ opacity: publicOrPrivate == 'public' ? '1': '0.5'}"/>
                <font-awesome-icon icon="lock" style="margin-right:5px;cursor:pointer;" @click="publicOrPrivate = 'private'"
                v-bind:style="{ opacity: publicOrPrivate == 'public' ? '0.5': '1'}"/>
            </b-col>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="heart" style="margin-right:15px;cursor:pointer;" @click="sortByGoodOrDate = 'good'"
                v-bind:style="{ opacity: sortByGoodOrDate == 'good' ? '1': '0.5'}"/>
                <font-awesome-icon icon="history" style="margin-right:5px;cursor:pointer;" @click="sortByGoodOrDate = 'date'"
                v-bind:style="{ opacity: sortByGoodOrDate == 'good' ? '0.5': '1'}"/>
            </b-col>
            <b-col cols="4" md="2" style="padding: 8px 24px;text-align:left;">
                <font-awesome-icon icon="map-marked" style="margin-right:15px;cursor:pointer;" @click="showAreaOrGlobaly = 'area'"
                v-bind:style="{ opacity: showAreaOrGlobaly == 'area' ? '1': '0.5'}"/>
                <font-awesome-icon icon="map" style="margin-right:5px;cursor:pointer;" @click="showAreaOrGlobaly = 'global'"
                v-bind:style="{ opacity: showAreaOrGlobaly == 'area' ? '0.5': '1'}"/>
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
