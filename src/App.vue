<template>
    <div id="app" class="mdl-layout">
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        updated() {
            // eslint-disable-next-line no-undef
            componentHandler.upgradeDom();
        },
    }
</script>

<style>
    body {
        font-family:"Roboto", "Helvetica", "Arial", sans-serif;
    }
</style>
