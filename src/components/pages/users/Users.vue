<template>
    <TableContent header="Użytkownicy" add-link="../add-user">
        <Table :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-user/${row.entity}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.username}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="group of row.groups" :key="group">{{group}}</div>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-red"
                                @click="deleteClick">
                            Usuń
                        </button>
                    </td>
                </router-link>
            </template>
        </Table>
    </TableContent>
</template>

<script>
    import Users from "../../../main/Users.js";

    import Table from "../../elements/table/Table.vue";
    import TableContent from '../../elements/layout/TableContent.vue';

    export default {
        name: "Users",
        components: {TableContent, Table},
        created() {
            this.fetchUsers();
        },
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa użytkownika', 'Role', ''
                    ],
                    rows: [],
                },
            }
        },
        methods: {
            deleteClick(e) {
                e.stopPropagation();
            },
            async fetchUsers() {
                this.table.rows = (await Users.getAll()).payload;
            }
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>