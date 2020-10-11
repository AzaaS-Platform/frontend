<template>
    <div v-if="!loading"
         class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h5 class="mdl-card__title-text text-color--white">Dodaj role</h5>
                </div>
                <div class="mdl-card__supporting-text">
                    <form class="form form--basic">
                        <div class="mdl-grid">
                            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                <div ref="mdlComponents" class="mdl-textfield mdl-js-textfield full-size">
                                    <input class="mdl-textfield__input" type="text" id="name" v-model="roleName">
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
                <EditableSelectList :elements="mappedPermissions" v-model="mappedPermissions"/>
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
    import Connector from '../../../main/connect/Connector.js';
    import Loading from '../../elements/Loading.vue';
    import EditableSelectList from '../../elements/form/EditableSelectList.vue';

    const connector = new Connector('groups/');

    export default {
        name: "AddRole",
        components: {EditableSelectList, Loading},
        props: {
            role: {
                type: Object,
                default: null
            },
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        data() {
            return {
                roleName: this.role ? this.role.name : '',
                mappedPermissions: this.role ? this.role.permissions.map(permission => ({
                    value: permission,
                    name: permission
                })) : [],
                loading: false
            }
        },
        methods: {
            async submitForm(e) {
                e.preventDefault();
                // TODO validation

                this.loading = true;
                if(this.role !== null) {
                    await connector.modify(this.role.entity, {
                        name: this.roleName,
                        permissions: [...this.mappedPermissions.map(permission => permission.value)]
                    });
                } else {
                    await connector.add({
                        name: this.roleName,
                        permissions: [...this.mappedPermissions.map(permission => permission.value)]
                    });
                }
                this.loading = false;
            }
        },
    }
</script>

<style scoped>

</style>