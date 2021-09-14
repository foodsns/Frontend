<template>
    <div id = "scrollbar">
        <form>
            거리조절:
            <input type="range" min="0" max="100" list="tmeperatures">
            <datalist id="tmeperatures">
                <option value="15" label="Low" />
                <option value="50" label="Medium" />
                <option value="85" label="High" />
            </datalist>
        </form>
    </div>
</template>

<script>
export default {
    name: 'scrollbar'
}
</script>

<style scoped>
</style>