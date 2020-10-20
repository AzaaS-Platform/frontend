<template>
    <div>
        <div class="avatar-dropdown" id="icon">
            <span>Luke</span>
            <i class="material-icons">person</i>
        </div>
        <ul class="mdl-menu mdl-list mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-shadow--2dp account-dropdown"
            for="icon">
            <router-link :to="`../settings`" tag="li" class="mdl-menu__item mdl-list__item cursor-pointer">
                <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-icon">settings</i>
                    Settings
                </span>
            </router-link>
            <li class="mdl-menu__item mdl-list__item" @click="logout">
                <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-icon text-color--secondary">exit_to_app</i>
                    Log out
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';

    export default {
        name: "AccountDropdown",
        methods: {
            async logout() {
                Fetcher.abortAll();

                await ConnectorFactory.invalidate();
                this.$router.push('/admin/login');
            }
        }
    }
</script>

<style scoped>
    .avatar-dropdown {
        display:flex;
        align-items:center;
    }
</style>