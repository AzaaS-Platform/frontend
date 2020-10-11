<template>
    <div v-if="!loading"
         class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h5 class="mdl-card__title-text text-color--white">Dodaj użytkownika</h5>
                </div>
                <div class="mdl-card__supporting-text">
                    <form class="form form--basic">
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                <div class="mdl-textfield mdl-js-textfield full-size">
                                    <input class="mdl-textfield__input" type="text" id="name" v-model="username">
                                    <label class="mdl-textfield__label" for="name">Nazwa użytkownika</label>
                                </div>
                            </div>
                            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                <div class="mdl-textfield mdl-js-textfield full-size">
                                    <input class="mdl-textfield__input" type="password" id="password"
                                           v-model="password">
                                    <label class="mdl-textfield__label" for="password">Hasło</label>
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
                    <h2 class="mdl-card__title-text">Role</h2>
                </div>
                <SelectList v-model="selected" :elements="mappedAllRoles" :init-selected="selected" :removable="false"/>
            </div>
        </div>
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"
                    @click="submitForm">
                <i class="material-icons">assignment_returned</i>
                Zapisz
            </button>
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
    import Loading from '../../elements/Loading.vue';
    import SelectList from '../../elements/form/SelectList.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';

    export default {
        name: "AddUser",
        components: {SelectList, Loading},
        props: {
            user: {
                type: Object,
                default: null
            },
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();

            this.fetchRoles();
        },
        data() {
            return {
                username: this.user ? this.user.username : '',
                password: '',
                selected: [],
                mappedAllRoles: [],
                loading: true
            }
        },
        methods: {
            async submitForm(e) {
                e.preventDefault();
                // TODO validation, submit

                const usersConnector = ConnectorFactory.getConnector('users');
                this.loading = true;
                if(this.user !== null) {
                    await usersConnector.modify(this.user.entity, {
                        groups: this.selected.map(element => element.value) ?? [],
                        username: this.username ? this.username : undefined,
                        password: this.password ? this.password : undefined
                    });
                } else {
                    await usersConnector.add({
                        groups: this.selected.map(element => element.value) ?? [],
                        username: this.username,
                        password: this.password
                    });
                }
                this.loading = false;
            },

            async fetchRoles() {
                try {
                    const rolesConnector = ConnectorFactory.getConnector('roles');
                    let roles = await rolesConnector.getAll();
                    this.mappedAllRoles = roles.map(role => ({value: role.entity, name: role.name}));
                    this.selected = this.user.groups.map(roleEntity => ({
                        value: roleEntity,
                        name: roles.find(role => role.entity === roleEntity).name
                    }))
                } catch(e) {
                    this.mappedAllRoles = [];
                } finally {
                    this.loading = false;
                }
            }
        },
    }
</script>

<style scoped>
</style>