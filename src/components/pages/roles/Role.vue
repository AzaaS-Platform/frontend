<template>
    <main class="mdl-layout__content">
        <Header :button="button"/>
        <div class="mdl-grid">
            <div class="mdl-cell">{{role.name}} | {{role.privileges.join(', ')}}</div>
            <div class="mdl-cell">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                    <i class="material-icons">edit</i>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
    import Roles from "../../../main/Roles.js";
    import Header from "../../elements/Header.vue";

    export default {
        name: "Role",
        components: {Header},
        data() {
            return {
                role: Roles.getRoleById(parseInt(this.$route.params.id)),
                button: {
                    text: 'Lista ról',
                    icon: 'add',
                    link: '/roles'
                },
            }
        },
    }
</script>

<style scoped>

</style>