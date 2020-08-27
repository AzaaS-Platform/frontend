<template>
    <BasicLayout>
        <TableContent header="Użytkownicy">
            <Table :headers="table.headers" :rows="table.rows">
                <template #header="{header}">{{header}}</template>
                <template #row="{row}">
                    <router-link :to="`../edit-user/${row.id}`" tag="tr" class="cursor-pointer">
                        <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                        <td class="mdl-data-table__cell--non-numeric">
                            <div v-for="role of row.roles" :key="role">{{role}}</div>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric">
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-red">
                                Usuń
                            </button>
                        </td>
                    </router-link>
                </template>
            </Table>
        </TableContent>
    </BasicLayout>
</template>

<script>
    import Users from "../../../main/Users.js";

    import Table from "../../elements/table/Table.vue";
    import BasicLayout from '../../elements/layout/BasicLayout.vue';
    import TableContent from '../../elements/layout/TableContent.vue';

    export default {
        name: "Users",
        components: {TableContent, BasicLayout, Table},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa użytkownika', 'Role', ''
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