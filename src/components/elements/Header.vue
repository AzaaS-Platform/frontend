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
                link: String,
            }
        },
        data() {
            return {
                showAddUser: false,
            };
        },
        methods: {
            buttonClicked() {
                this.$router.push(this.button.link)
            }
        }
    }
</script>

<style scoped>

</style>