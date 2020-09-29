<template>
    <AddUser v-if="user !== null" :name="user.name" :roles="user.roles" />
    <NotFound v-else/>
</template>

<script>
    import AddUser from "./AddUser.vue";
    import Users from "../../../main/Users.js";
    import NotFound from '../errors/NotFound.vue';

    export default {
        name: "EditUser",
        components: {NotFound, AddUser},
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