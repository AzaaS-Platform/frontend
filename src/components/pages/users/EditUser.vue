<template>
    <AddUser v-if="user !== null" :name="user.username" :roles="user.groups"/>
    <NotFound v-else/>
</template>

<script>
    import AddUser from "./AddUser.vue";
    import Users from "../../../main/Users.js";
    import NotFound from '../errors/NotFound.vue';

    export default {
        name: "EditUser",
        components: {NotFound, AddUser},
        created() {
            console.log(this.$route.params.id);
            this.fetchUser(this.$route.params.id);
        },
        data() {
            return {
                user: null
            };
        },
        methods: {
            async fetchUser(entity) {
                console.log((await Users.get(entity)).payload);
                this.user = (await Users.get(entity)).payload ?? null;
            }
        }
    }
</script>

<style scoped>

</style>