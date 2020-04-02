<template>
    <Table :table="table" />
</template>

<script>
    import Users from "../../main/Users.js";

    import Table from "../elements/table/Table.vue";

    export default {
        name: "Users",
        components: {Table},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa użytkownika', 'Role'
                    ],
                    content: Users.fetch(),
                },
            }
        },
    }
</script>

<style scoped>

</style>