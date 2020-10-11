<template>
    <TableContent header="Użytkownicy" add-link="../add-user">
        <Table v-if="!loading" :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-user/${row.entity}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.username}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="group of row.groups" :key="group">{{roles.find(role => role.entity ===
                            group).name}}
                        </div>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-red"
                                @click="e => deleteClick(e, row.entity)">
                            Usuń
                        </button>
                    </td>
                </router-link>
            </template>
        </Table>
        <Loading v-else/>
    </TableContent>
</template>

<script>
    import Table from "../../elements/table/Table.vue";
    import TableContent from '../../elements/layout/TableContent.vue';
    import Connector from '../../../main/connect/Connector.js';
    import Loading from '../../elements/Loading.vue';

    const connector = new Connector('users/');
    const rolesConnector = new Connector('groups/');

    export default {
        name: "Users",
        components: {Loading, TableContent, Table},
        mounted() {
            (async() => {
                this.loading = true;
                await this.fetchUsers();
                await this.fetchRoles();
                this.loading = false;
            })()
        },
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa użytkownika', 'Role', ''
                    ],
                    rows: [],
                },
                loading: true,
                roles: []
            }
        },
        methods: {
            async deleteClick(e, entity) {
                e.stopPropagation();

                try {
                    this.loading = true;
                    await connector.delete(entity);
                    this.table.rows = this.table.rows.filter(user => user.entity !== entity);
                } catch(e) {
                    this.table.rows = [];
                } finally {
                    this.loading = false;
                }
            },

            async fetchUsers() {
                try {
                    this.table.rows = await connector.getAll();
                } catch(e) {
                    this.table.rows = [];
                }
            },

            async fetchRoles() {
                try {
                    this.roles = await rolesConnector.getAll();
                } catch(e) {
                    this.roles = [];
                }
            }
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>