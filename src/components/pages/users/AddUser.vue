<template>
    <div class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
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
                                    <input class="mdl-textfield__input" type="text" id="name" v-model="userName">
                                    <label class="mdl-textfield__label" for="name">Nazwa</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <FormList :elements="allRoles" v-model="selected" :adding="false" header="Role"/>
        </div>
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"
                    @click="submitForm">
                <i class="material-icons">assignment_returned</i>
                Zapisz
            </button>
        </div>
    </div>
</template>

<script>
    import FormList from '../../elements/form/FormList.vue';
    import Connector from '../../../main/connect/Connector.js';

    const rolesConnector = new Connector('groups/');

    export default {
        name: "AddUser",
        components: {FormList},
        props: {
            name: {
                type: String,
                default: ''
            },
            roles: {
                type: Array,
                default: () => []
            },
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        data() {
            return {
                userName: this.name,
                selected: this.roles,
                allRoles: [],
            }
        },
        methods: {
            submitForm(e) {
                e.preventDefault();
                // TODO validation, submit
                console.log(this.selected);
            },

            async fetchRoles() {
                this.allRoles = await rolesConnector.getAll();
            }
        },
    }
</script>

<style scoped>
</style>