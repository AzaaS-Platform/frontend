<template>
    <div>
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_back_ios</i>
        </button>
        <router-link :to="`${i - 1}`" v-for="i in 2" :key="i"><button class="mdl-button mdl-js-button">{{i}}</button></router-link>
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_forward_ios</i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Pagination"
    }
</script>

<style scoped>

</style>