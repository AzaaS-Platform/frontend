<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header is-small-screen">
        <Header v-show="showHeader"/>
        <Drawer v-show="showHeader"/>
        <main class="mdl-layout__content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import Drawer from '../Drawer.vue';
    import Header from '../Header.vue';

    export default {
        name: "BasicLayout",
        components: {Header, Drawer},
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        updated() {
            this.showHeader = this.$route.matched[0].path !== '/admin';
        },
        data() {
            return {
                showHeader: this.$route.matched[0].path !== '/admin'
            };
        }
    }
</script>

<style scoped>

</style>