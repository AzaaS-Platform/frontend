<template>
    <div class="flex-center">
        <Header :button="button"/>
        <form @submit="submitForm" class="form-container">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="name" :value="name">
                <label class="mdl-textfield__label" for="name">Nazwa roli...</label>
            </div>
            <div>
                <div v-for="privilege of privileges" :key="privilege" class="privilege-box">
                    <div class="text">{{privilege}}</div>
                    <button @click="removePrivilege(privilege)" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>
            <div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="privilegeText" v-model="privilege">
                    <label class="mdl-textfield__label" for="privilegeText">Uprawnienie...</label>
                </div>
                <button @click="addPrivilege" type="button" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
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
            privileges: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                button: {
                    text: 'Lista ról',
                    icon: 'add',
                    link: '/roles'
                },
                privilege: '',
            }
        },
        methods:{
            submitForm(e) {
                e.preventDefault();
                console.log("test");
            },
            addPrivilege() {
                if(this.privilege !== '' && !this.privileges.includes(this.privilege)) {
                    this.privileges.push(this.privilege);
                }
            },
            removePrivilege(privilege) {
                this.privileges.splice(this.privileges.indexOf(privilege), 1);
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