<template>
<div>
    <b-button v-b-tooltip.hover.topleft.v-secondary title="사용법"
    class="manual-btn"
    pill variant="outline-secondary"
    @click="startOnboarding()">
        <b-icon icon="question-circle" ></b-icon>
    </b-button>
</div>
</template>

<script>

export default {
    methods: {
        startOnboarding: function () {
            this.$intro().start() // start the guide
    }
    }
}
</script>

<style scoped>
.manual-btn{
    margin-left: 5px;
}
</style>
