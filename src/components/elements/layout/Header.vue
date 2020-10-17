<template>
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <Search/>
            <AccountDropdown/>
            <More/>
        </div>
    </header>
</template>

<script>
    import Search from '../header/Search.vue';
    import AccountDropdown from '../header/AccountDropdown.vue';
    import More from '../header/More.vue';

    export default {
        name: "Header",
        components: {More, AccountDropdown, Search},
    }
</script>

<style scoped>
</style>