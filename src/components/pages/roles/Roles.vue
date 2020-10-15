<template>
    <TableContent header="Role" add-link="../add-role">
        <Table v-if="!loading" :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-role/${row.entity}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="permission of row.permissions" :key="permission">
                            {{permission}}
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
        name: "Roles",
        components: {Loading, TableContent, Table},
        mounted() {
            this.fetchRoles();
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa roli', 'Uprawnienia', ''
                    ],
                    rows: [],
                },
                loading: true,
            }
        },
        methods: {
            async deleteClick(e, entity) {
                e.stopPropagation();

                try {
                    const rolesConnector = ConnectorFactory.getConnector('roles');
                    this.loading = true;
                    await rolesConnector.delete(entity);
                    this.table.rows = this.table.rows.filter(role => role.entity !== entity);
                } catch(e) {
                    this.table.rows = [];
                } finally {
                    this.loading = false;
                }
            },

            async fetchRoles() {
                try {
                    const rolesConnector = ConnectorFactory.getConnector('roles');
                    this.table.rows = await rolesConnector.getAll();
                } catch(e) {
                    this.table.rows = [];
                } finally {
                    this.loading = false;
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