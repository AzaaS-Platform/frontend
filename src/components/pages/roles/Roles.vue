<template>
    <main class="mdl-layout__content">
        <Header mb-href="/users" bb-href="/add-role">
            <template #main-button>Użytkownicy</template>
            <template #back-button>Dodaj Role</template>
        </Header>
        <Table :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-role/${row.id}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">{{row.permissions.join(', ')}}</td>
                </router-link>
            </template>
        </Table>
    </main>
</template>

<script>
    import Roles from "../../../main/Roles.js";

    import Header from "../../elements/Header.vue";
    import Table from "../../elements/table/Table.vue";

    export default {
        name: "Roles",
        components: {Table, Header},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa roli', 'Uprawnienia'
                    ],
                    rows: Roles.fetch(),
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