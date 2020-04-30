<template>
    <div class="mdl-grid">
        <div class="mdl-layout-spacer"></div>
        <router-link :to="mbHref" tag="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent mdl-color-text--white">
            <slot name="main-button" />
        </router-link>
        <router-link :to="bbHref" tag="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
            <slot name="back-button" />
        </router-link>
        <div class="mdl-layout-spacer"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            mbHref: String,
            bbHref: String,
        }
    }
</script>

<style scoped>
    .mdl-button {
        margin:0 1rem;
    }
</style>