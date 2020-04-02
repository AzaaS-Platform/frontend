<template>
    <div id="app" class="mdl-layout">
        <main class="mdl-layout__content">
            <Header :button="button" />
        </main>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    import Header from "./components/elements/Header.vue";

    export default {
        name: 'App',
        components: {Header},
        updated() {
            // eslint-disable-next-line no-undef
            componentHandler.upgradeDom();
        },
        data() {
            return {
                button: {
                    text: 'Dodaj użytkownika',
                    icon: 'add',
                },
            }
        },
    }
</script>

<style>
    body {
        font-family:"Roboto", "Helvetica", "Arial", sans-serif;
    }
</style>
