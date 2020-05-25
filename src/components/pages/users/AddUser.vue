<template>
    <div class="flex-center">
        <Header mb-href="/roles" bb-href="/users">
            <template #main-button>Role</template>
            <template #back-button>Użytkownicy</template>
        </Header>
        <form @submit="submitForm" class="form-container">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="name" v-model="userName">
                <label class="mdl-textfield__label" for="name">Nazwa użytkownika...</label>
            </div>
            <div>
                <div v-for="role of roles" :key="role" class="privilege-box">
                    <div class="text">{{role}}</div>
                    <button @click="removeRole(role)" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="permissionText" v-model="role">
                    <label class="mdl-textfield__label" for="permissionText">Rola...</label>
                </div>
                <button @click="addRole" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
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
        name: "AddUser",
        components: {Header},
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
        data() {
            return {
                userName: this.name,
                role: '',
            }
        },
        methods:{
            submitForm(e) {
                e.preventDefault();
                // TODO validation, submit
            },
            addRole() {
                if(this.role !== '' && !this.roles.includes(this.role)) {
                    this.roles.push(this.role);
                }
            },
            removeRole(privilege) {
                this.roles.splice(this.roles.indexOf(privilege), 1);
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