<template>
    <TableContent header="Role" add-link="../add-role">
        <Table :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-role/${row.id}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.id}}</td>
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="permission of row.permissions" :key="permission">
                            {{permission}}
                        </div>
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
</template>

<script>
    import Roles from "../../../main/Roles.js";

    import Table from "../../elements/table/Table.vue";
    import TableContent from '../../elements/layout/TableContent.vue';

    export default {
        name: "Roles",
        components: {TableContent, Table},
        data() {
            return {
                table: {
                    headers: [
                        '#', 'Nazwa roli', 'Uprawnienia', ''
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