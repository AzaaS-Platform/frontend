<template>
    <TableContent header="Użytkownicy" add-link="../add-user">
        <Table v-if="!loading" :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-user/${row.entity}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.username}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="group of row.groups" :key="group">
                            {{roles.find(role => role.entity === group).name}}
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
    import Loading from '../../elements/Loading.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';

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
        beforeDestroy() {
            Fetcher.abortAll();
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
                    const usersConnector = ConnectorFactory.getConnector('users');
                    this.loading = true;
                    await usersConnector.delete(entity);
                    this.table.rows = this.table.rows.filter(user => user.entity !== entity);
                } catch(e) {
                    this.table.rows = [];
                } finally {
                    this.loading = false;
                }
            },

            async fetchUsers() {
                try {
                    const usersConnector = ConnectorFactory.getConnector('users');
                    this.table.rows = await usersConnector.getAll();
                } catch(e) {
                    this.table.rows = [];
                }
            },

            async fetchRoles() {
                try {
                    const rolesConnector = ConnectorFactory.getConnector('roles');
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