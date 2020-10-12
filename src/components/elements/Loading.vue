<template>
    <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
        <div id="p7"
             class="mdl-progress mdl-js-progress mdl-progress__indeterminate progress--colored-light-blue"></div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
    }
</script>

<style scoped>

</style>