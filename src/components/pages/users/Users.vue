<template>
    <main class="mdl-layout__content">
        <Header mb-href="/roles" bb-href="/add-user">
            <template #main-button>Role</template>
            <template #back-button>Dodaj Użytkownika</template>
        </Header>
        <Table :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-user/${row.id}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="role of row.roles" :key="role">{{role}}</div>
                    </td>
                </router-link>
            </template>
        </Table>
    </main>
</template>

<script>
    import Users from "../../../main/Users.js";

    import Header from "../../elements/Header.vue";
    import Table from "../../elements/table/Table.vue";

    export default {
        name: "Users",
        components: {Table, Header},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa użytkownika', 'Role'
                    ],
                    rows: Users.fetch(),
                },
            }
        },
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>