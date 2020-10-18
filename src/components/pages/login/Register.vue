<template>
    <div class="login">
        <div class="login__inner">
            <div class="mdl-card mdl-card__login mdl-shadow--2dp">
                <div class="mdl-card__supporting-text color--dark-gray">
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                            <span class="login-name text-color--white">Rejestracja</span>
                        </div>
                        <div v-if="!!errorMessage" class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                            <span class="color-text--red">{{errorMessage}}</span>
                        </div>
                        <div v-show="!loading">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="client" v-model="client">
                                    <label class="mdl-textfield__label" for="client">Klient</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="login" v-model="login">
                                    <label class="mdl-textfield__label" for="login">Login</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="password" v-model="password">
                                    <label class="mdl-textfield__label" for="password">Hasło</label>
                                </div>
                                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect checkbox--colored-light-blue checkbox--inline"
                                       for="checkbox-1">
                                    <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" checked>

                                </label>
                                <span class="login-link">I agree all statements in <a href="#" class="underlined">terms of service</a></span>
                            </div>
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone submit-cell">
                                <router-link :to="'login'" class="login-link">
                                    Już mam konto
                                </router-link>
                                <div class="mdl-layout-spacer"></div>
                                <button class="mdl-button mdl-js-button mdl-button--raised color--light-blue"
                                        type="button" @click="submitSignUp">
                                    Zarejestruj się
                                </button>
                            </div>
                        </div>
                        <Loading v-show="loading"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Loading from '../../elements/Loading.vue';
    import Fetcher from '../../../main/connect/Fetcher.js';

    export default {
        name: "Register",
        components: {Loading},
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                loading: false,
                login: '',
                password: '',
                client: '',
                errorMessage: '',
            }
        },
        methods: {
            async submitSignUp() {
                this.errorMessage = '';
                this.loading = true;

                try {
                    await ConnectorFactory.register(this.client, this.login, this.password);
                    this.$router.push('/dashboard/users');
                } catch(e) {
                    this.errorMessage = e;
                    this.loading = false;
                }
            },
        }
    }
</script>

<style scoped>

</style>