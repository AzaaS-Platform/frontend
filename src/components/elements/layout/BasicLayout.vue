<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header is-small-screen">
        <Header/>
        <Drawer/>
        <main class="mdl-layout__content">
            <slot/>
        </main>
    </div>
</template>

<script>
    import Drawer from '../Drawer.vue';
    import Header from '../Header.vue';
    export default {
        name: "BasicLayout",
        components: {Header, Drawer}
    }
</script>

<style scoped>

</style>