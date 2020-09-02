<template>
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
            <FormList v-model="dataPermissions" :adding="true" header="Uprawnienia"/>
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

    export default {
        name: "AddRole",
        components: {FormList},
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
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        data() {
            return {
                roleName: this.name,
                dataPermissions: [...this.permissions],
                selected: [],
                permission: '',
            }
        },
        methods: {
            submitForm(e) {
                e.preventDefault();
                // TODO validation, submit
                console.log(this.dataPermissions);
            }
        },
    }
</script>

<style scoped>

</style>