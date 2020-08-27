<template>
    <BasicLayout>
        <div class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
                <div class="mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h5 class="mdl-card__title-text text-color--white">Dodaj role</h5>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <form class="form form--basic">
                            <div class="mdl-grid">
                                <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                    <div class="mdl-textfield mdl-js-textfield full-size">
                                        <input class="mdl-textfield__input" type="text" id="name">
                                        <label class="mdl-textfield__label" for="name">Nazwa</label>
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
                        <h2 class="mdl-card__title-text">Uprawnienia</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <ul class="mdl-list">
                            <li v-for="(permission, idx) in dataPermissions" :key="idx" class="mdl-list__item">
                                <span class = "mdl-list__item-primary-content">
                                    <label :for="idx" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                                        <input type="checkbox" :id="idx" class="mdl-checkbox__input" :value="idx" v-model="selectedPermissions"/>
                                        <span class="mdl-checkbox__label">{{permission}}</span>
                                    </label>
                                </span>
                                <div class="mdl-list__item-secondary-content">
                                    <button :for="idx" class="mdl-button mdl-js-button mdl-button--icon button--colored mdl-button--mini-icon pull-right" @click="removePermission(idx)">
                                        <i class="material-icons">clear</i>
                                    </button>
                                </div>
                            </li>
                            <li class="mdl-list__item">
                                <div class="mdl-textfield mdl-js-textfield">
                                    <input class="mdl-textfield__input" type="text" id="todo-input" v-model="permission">
                                    <label class="mdl-textfield__label" for="todo-input">Uprawnienie</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mdl-card__actions">
                        <button class="mdl-button mdl-js-button mdl-js-ripple-effect" @click="removeSelected">usuń zaznaczone</button>
                        <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-shadow--8dp mdl-button--colored" @click="addPermission">
                            <i class="material-icons mdl-js-ripple-effect">add</i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue">
                    <i class="material-icons">assignment_returned</i>
                    Zapisz
                </button>
            </div>
        </div>
    </BasicLayout>
</template>

<script>
    import BasicLayout from '../../elements/layout/BasicLayout.vue';

    export default {
        name: "AddRole",
        components: {BasicLayout},
        props: {
            name: {
                type: String,
                default: ''
            },
            permissions: {
                type: Array,
                default: () => []
            },
        },
        updated() {
            // eslint-disable-next-line no-undef
            componentHandler.upgradeDom();
        },
        data() {
            return {
                roleName: this.name,
                dataPermissions: this.permissions,
                selectedPermissions: [],
                permission: '',
            }
        },
        methods: {
            submitForm(e) {
                e.preventDefault();
                // TODO validation, submit
            },

            addPermission() {
                if(this.permission !== '' && !this.permissions.includes(this.permission)) {
                    this.permissions.push(this.permission);
                }
            },

            removePermission(idx) {
                this.permissions.splice(idx, 1);
            },

            removeSelected() {
                let permissionsCopy = [];
                for(let [idx, value] of this.dataPermissions.entries()) {
                    if(!this.selectedPermissions.includes(idx)) {
                        permissionsCopy.push(value)
                    }
                }
                this.dataPermissions = permissionsCopy;
                this.selectedPermissions = [];
            }
        },
    }
</script>

<style scoped>

</style>