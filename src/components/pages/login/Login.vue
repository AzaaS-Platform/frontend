<template>
    <div class="login">
        <div class="login__inner">
            <div class="mdl-card mdl-card__login mdl-shadow--2dp">
                <div class="mdl-card__supporting-text color--dark-gray">
                    <div class="mdl-grid">
                        <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                            <span class="login-name text-color--white">Sign in</span>
                            <span class="login-secondary-text text-color--smoke">Enter fields to sign in</span>
                        </div>
                        <div v-if="!!message" class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                            <span :class="`color-text--${message.type}`">{{message.text}}</span>
                        </div>
                        <form v-show="!loading" @submit="submitLogin">
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="client" v-model="client">
                                    <label class="mdl-textfield__label" for="client">Client</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="text" id="login" v-model="login">
                                    <label class="mdl-textfield__label" for="login">Username</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="password" id="password"
                                           v-model="password">
                                    <label class="mdl-textfield__label" for="password">Password</label>
                                </div>
                                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label full-size">
                                    <input class="mdl-textfield__input" type="password" id="token"
                                           v-model="token">
                                    <label class="mdl-textfield__label" for="password">2FA code (if enabled)</label>
                                </div>
                            </div>
                            <div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone submit-cell">
                                <router-link :to="'register'" class="login-link">
                                    Don't have account?
                                </router-link>
                                <div class="mdl-layout-spacer"></div>
                                <button class="mdl-button mdl-js-button mdl-button--raised color--light-blue"
                                        type="submit" @click="submitLogin">
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <Loading v-show="loading"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '../../elements/Loading.vue';
import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
import Token from '../../../main/storage/Token.js';
import Client from '../../../main/storage/Client.js';
import Fetcher from '../../../main/connect/Fetcher.js';

export default {
    name: "Login",
    components: {Loading},
    created() {
        const token = Token.restore();
        if (token && Token.checkExpiryTime(token)) {
            this.$router.push('/dashboard/users');
        }
    },
    beforeDestroy() {
        Fetcher.abortAll();
        },
        data() {
            let message = null;
            if(this.$route.query.error) {
                message = {
                    text: atob(this.$route.query.error),
                    type: 'red',
                };
            } else if(this.$route.query.success) {
                message = {
                    text: atob(this.$route.query.success),
                    type: 'green',
                };
            }

            return {
                loading: false,
                login: '',
                password: '',
                token: '',
                client: Client.restore() ?? '',
                message,
            }
        },
        methods: {
            async submitLogin(e) {
                e.preventDefault();

                this.message = null;
                this.loading = true;

                try {
                    await ConnectorFactory.authenticate(this.client, this.login, this.password, this.token);

                    if (Token.extractIsAdmin(Token.restore())) {
                        this.$router.push('/dashboard/users');
                    } else {
                        this.$router.push('/dashboard/settings');
                    }
                } catch(e) {
                    this.message = {
                        text: e.message,
                        type: 'red',
                    };
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>