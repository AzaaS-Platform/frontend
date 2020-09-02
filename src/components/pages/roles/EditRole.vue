<template>
    <AddRole v-if="role !== null" :name="role.name" :permissions="role.permissions" />
    <NotFound v-else/>
</template>

<script>
    import AddRole from "./AddRole.vue";

    import Roles from "../../../main/Roles.js";
    import NotFound from '../errors/NotFound.vue';

    export default {
        name: "EditRole",
        components: {NotFound, AddRole},
        computed: {
            role() {
                let id = parseInt(this.$route.params.id);
                return isNaN(id) ? null : Roles.getRoleById(id);
            }
        }
    }
</script>

<style scoped>

</style>