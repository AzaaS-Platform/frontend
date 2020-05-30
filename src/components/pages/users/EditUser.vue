<template>
    <AddUser v-if="user !== null" :name="user.name" :roles="user.roles" />
    <div v-else class="mdl-grid">
        <div>Użytkownik o podanym id nie istnieje</div>
    </div>
</template>

<script>
    import AddUser from "./AddUser.vue";
    import Users from "../../../main/Users.js";

    export default {
        name: "EditUser",
        components: {AddUser},
        computed: {
            user() {
                let id = parseInt(this.$route.params.id);
                return isNaN(id) ? null : Users.getUserById(id);
            }
        }
    }
</script>

<style scoped>

</style>