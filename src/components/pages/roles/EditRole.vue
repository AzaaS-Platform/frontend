<template>
    <AddRole v-if="role !== null" :name="role.name" :permissions="role.permissions" />
    <div v-else>Rola o podanym id nie istnieje</div>
</template>

<script>
    import AddRole from "./AddRole.vue";

    import Roles from "../../../main/Roles.js";

    export default {
        name: "EditRole",
        components: {AddRole},
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