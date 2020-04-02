<template>
    <div class="mdl-grid">
        <div class="mdl-layout-spacer"></div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent mdl-color-text--white">
            Role
        </button>
        <button @click="buttonClicked" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">{{button.icon}}</i>
            {{button.text}}
        </button>
        <div class="mdl-layout-spacer"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            button: {
                text: String,
                icon: String,
            }
        },
        data() {
            return {
                showAddUser: false,
            };
        },
        methods: {
            buttonClicked() {
                this.showAddUser = !this.showAddUser;
                if(this.showAddUser) {
                    this.button.text = 'Lista użytkowników';
                    this.button.icon = 'arrow_back';
                    this.$router.push('/add-user')
                } else {
                    this.button.text = 'Dodaj użytkownika';
                    this.button.icon = 'add';
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style scoped>

</style>