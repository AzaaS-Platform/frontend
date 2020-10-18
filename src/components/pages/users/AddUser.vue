<template>
    <div>
        <div v-if="!loading"
             class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
                <div class="mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h5 class="mdl-card__title-text text-color--white">{{header}}</h5>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <form class="form form--basic">
                            <div class="mdl-grid">
                                <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                    <div class="mdl-textfield mdl-js-textfield full-size">
                                        <input class="mdl-textfield__input" type="text" id="name" v-model="username">
                                        <label class="mdl-textfield__label" for="name">Username</label>
                                    </div>
                                </div>
                                <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                    <div class="mdl-textfield mdl-js-textfield full-size">
                                        <input class="mdl-textfield__input" type="password" id="password"
                                               v-model="password">
                                        <label class="mdl-textfield__label" for="password">Password</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
                <div class="mdl-card mdl-shadow--2dp todo">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">Roles</h2>
                    </div>
                    <SelectList v-model="selected" :elements="mappedAllRoles" :init-selected="selected"
                                :removable="false"/>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"
                        @click="submitForm">
                    <i class="material-icons">assignment_returned</i>
                    Save
                </button>
            </div>
        </div>
        <Loading v-else/>
        <MessageBox v-if="!!messageBox" :key="messageBoxKey" :message="messageBox.message" :type="messageBox.type"/>
    </div>
</template>

<script>
    import Loading from '../../elements/Loading.vue';
    import SelectList from '../../elements/form/SelectList.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';
    import Utils from '../../../main/utils/Utils.js';
    import MessageBox, {TYPE_DANGER, TYPE_SUCCESS} from '../../elements/MessageBox.vue';

    const USER_MODIFIED = 'User modified successfully';
    const USER_ADDED = 'User added successfully';

    export default {
        name: "AddUser",
        components: {MessageBox, SelectList, Loading},
        props: {
            user: {
                type: Object,
                default: null
            },
            header: {
                type: String,
                default: 'Add user'
            },
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();

            this.loading = true;
            Utils.handleRequests(this.$router, async() => {
                await this.fetchRoles();

                this.loading = false;
            });
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                username: this.user ? this.user.username : '',
                password: '',
                selected: [],
                mappedAllRoles: [],
                loading: true,
                messageBox: null,
                messageBoxKey: 0,
            }
        },
        methods: {
            async submitForm(e) {
                e.preventDefault();
                // TODO validation

                const usersConnector = ConnectorFactory.getConnector('users');
                this.loading = true;
                try {
                    if(this.user !== null) {
                        await Utils.handleRequests(this.$router, async() => {
                            await usersConnector.modify(this.user.entity, {
                                groups: this.selected.map(element => element.value) ?? [],
                                username: this.username ? this.username : undefined,
                                password: this.password ? this.password : undefined
                            });
                        });

                        this.messageBox = {
                            message: USER_MODIFIED,
                            type: TYPE_SUCCESS,
                        };
                    } else {
                        await Utils.handleRequests(this.$router, async() => {
                            await usersConnector.add({
                                groups: this.selected.map(element => element.value) ?? [],
                                username: this.username,
                                password: this.password
                            });
                        });

                        this.messageBox = {
                            message: USER_ADDED,
                            type: TYPE_SUCCESS,
                        };
                    }
                } catch(e) {
                    this.messageBox = {
                        message: e.message,
                        type: TYPE_DANGER,
                    };
                }
                ++this.messageBoxKey;
                this.loading = false;
            },

            async fetchRoles() {
                const rolesConnector = ConnectorFactory.getConnector('roles');
                let roles = await rolesConnector.getAll();
                this.mappedAllRoles = roles.map(role => ({value: role.entity, name: role.name}));
                if(this.user) {
                    this.selected = this.user.groups.map(roleEntity => ({
                        value: roleEntity,
                        name: roles.find(role => role.entity === roleEntity).name
                    }));
                }
            }
        },
    }
</script>

<style scoped>
</style>