<template>
    <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <AccountDropdown/>
        </div>
    </header>
</template>

<script>
    import AccountDropdown from '../header/AccountDropdown.vue';

    export default {
        name: "Header",
        components: {AccountDropdown},
    }
</script>

<style scoped>
</style>