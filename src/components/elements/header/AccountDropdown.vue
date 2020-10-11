<template>
    <div>
        <div class="avatar-dropdown" id="icon">
            <span>Luke</span>
            <img src="images/Icon_header.png">
        </div>
        <ul class="mdl-menu mdl-list mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-shadow--2dp account-dropdown"
            for="icon">
            <li class="mdl-list__item mdl-list__item--two-line">
                    <span class="mdl-list__item-primary-content">
                        <span class="material-icons mdl-list__item-avatar"></span>
                        <span>Luke</span>
                        <span class="mdl-list__item-sub-title">Luke@skywalker.com</span>
                    </span>
            </li>
            <li class="list__item--border-top"></li>
            <li class="mdl-menu__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <i class="material-icons mdl-list__item-icon">account_circle</i>
                        My account
                    </span>
            </li>
            <li class="list__item--border-top"></li>
            <li class="mdl-menu__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <i class="material-icons mdl-list__item-icon">settings</i>
                        Settings
                    </span>
            </li>
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

    export default {
        name: "AccountDropdown",
        methods: {
            async logout() {
                await ConnectorFactory.invalidate();
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>