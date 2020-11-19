<template>
    <div :class="`mdl-layout mdl-js-layout
    ${showDrawer ? 'mdl-layout--fixed-drawer' : 'no-drawer'}
    ${showHeader ? 'mdl-layout--fixed-header' : ''}
    is-small-screen`">
        <Header v-show="showHeader"/>
        <Drawer v-show="showHeader"/>
        <main class="mdl-layout__content" :style="!showDrawer && {marginLeft: '0px'}">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Drawer from './Drawer.vue';
import Header from './Header.vue';
import Token from "@/main/storage/Token.js";

export default {
    name: "BasicLayout",
    components: {Header, Drawer},
    mounted() {
        // eslint-disable-next-line
        componentHandler.upgradeDom();
    },
    updated() {
        this.showHeader = this.$route.matched[0].path !== '/admin';
        this.showDrawer = !!Token.extractIsAdmin(Token.restore()) && this.$route.matched[0].path !== '/admin';
    },
        data() {
            return {
                showHeader: this.$route.matched[0].path !== '/admin',
                showDrawer: !!Token.extractIsAdmin(Token.restore()) && this.$route.matched[0].path !== '/admin'
            };
        }
    }
</script>

<style scoped>
</style>