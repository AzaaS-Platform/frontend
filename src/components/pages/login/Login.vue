<template>
    <div class="mdl-layout mdl-js-layout color--gray is-small-screen login">
        <main class="mdl-layout__content">
            <div class="mdl-card mdl-card__login mdl-shadow--2dp">
                <div class="mdl-card__supporting-text color--dark-gray">
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                            <span class="login-name text-color--white">Logowanie</span>
                            <span class="login-secondary-text text-color--smoke">Wprowadź dane aby się zalogować</span>
                        </div>
                        <div v-show="!loading">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="e-mail">
                                    <label class="mdl-textfield__label" for="e-mail">Email</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="password">
                                    <label class="mdl-textfield__label" for="password">Hasło</label>
                                </div>
                                <a href="forgot-password.html" class="login-link">Zapomniałeś hasła?</a>
                            </div>
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone submit-cell">
                                <a href="sign-up.html" class="login-link">Nie masz konta?</a>
                                <div class="mdl-layout-spacer"></div>
                                <button class="mdl-button mdl-js-button mdl-button--raised color--light-blue"
                                        type="button" @click="login">
                                    Zaloguj się
                                </button>
                            </div>
                        </div>
                        <Loading v-show="loading"/>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import Loading from '../../elements/Loading.vue';

    export default {
        name: "Login",
        components: {Loading},
        data() {
            return {
                loading: false
            }
        },
        methods: {
            login() {
                this.loading = true;
            }
        }
    }
</script>

<style scoped>

</style>