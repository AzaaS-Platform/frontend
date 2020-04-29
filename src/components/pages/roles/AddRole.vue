<template>
    <div class="flex-center">
        <Header>
            <template #main-button>Użytkownicy</template>
            <template #back-button>Role</template>
        </Header>
        <form @submit="submitForm" class="form-container">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="name" :value="name">
                <label class="mdl-textfield__label" for="name">Nazwa roli...</label>
            </div>
            <div>
                <div v-for="permission of permissions" :key="permission" class="privilege-box">
                    <div class="text">{{permission}}</div>
                    <button @click="removePrivilege(permission)" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="permissionText" v-model="permission">
                    <label class="mdl-textfield__label" for="permissionText">Uprawnienie...</label>
                </div>
                <button @click="addPermission" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">add</i>
                </button>
            </div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue-700 mdl-color-text--white">
                Zapisz
            </button>
        </form>
    </div>
</template>

<script>
    import Header from "../../elements/Header.vue";

    export default {
        name: "AddRole",
        components: {Header},
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
        data() {
            return {
                permission: '',
            }
        },
        methods:{
            submitForm(e) {
                e.preventDefault();
                // TODO validation, submit
            },
            addPermission() {
                if(this.permission !== '' && !this.permissions.includes(this.permission)) {
                    this.permissions.push(this.permission);
                }
            },
            removePrivilege(privilege) {
                this.permissions.splice(this.permissions.indexOf(privilege), 1);
            },
        },
    }
</script>

<style scoped>
    .form-container {
        display:inline-flex;
        flex-direction:column;
    }

    .flex-center {
        display:inline-flex;
        flex-direction:column;
        align-items:center;
    }

    .privilege-box {
        display:flex;
        margin-bottom:1rem;
    }

    .privilege-box > .text {
        display:flex;
        align-items:center;
        flex-grow:1;
    }

    .mdl-button--fab {
        margin-left:1rem;
    }
</style>