<template>
    <div class="mdl-grid">
        <div class="mdl-layout-spacer"></div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent mdl-color-text--white">
            <slot name="main-button" />
        </button>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">arrow_back</i>
            <slot name="back-button" />
        </button>
        <div class="mdl-layout-spacer"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
    }
</script>

<style scoped>
    .mdl-button {
        margin:0 1rem;
    }
</style>