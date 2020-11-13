<template>
    <div>
        <TableContent header="Roles" add-link="/dashboard/add-role">
            <Table v-if="!loading" :headers="table.headers" :rows="table.rows">
                <template #header="{header}">{{header}}</template>
                <template #row="{row}">
                    <router-link :to="`/dashboard/edit-role/${row.entity}`" tag="tr" class="cursor-pointer">
                        <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                        <td class="mdl-data-table__cell--non-numeric">
                            <div v-for="permission of row.permissions" :key="permission">
                                {{permission}}
                            </div>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric">
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-red"
                                    @click="e => deleteClick(e, row.entity)">
                                Delete
                            </button>
                        </td>
                    </router-link>
                </template>
            </Table>
            <Loading v-else/>
        </TableContent>
        <MessageBox v-if="!!messageBox" :key="messageBoxKey" :message="messageBox.message" :type="messageBox.type"/>
    </div>
</template>

<script>
    import Table from "../../elements/table/Table.vue";
    import TableContent from '../../elements/layout/TableContent.vue';
    import Loading from '../../elements/Loading.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';
    import Utils from '../../../main/utils/Utils.js';
    import MessageBox, {TYPE_DANGER, TYPE_SUCCESS} from '../../elements/MessageBox.vue';

    const ROLE_DELETED = 'Role deleted successfully';

    export default {
        name: "Roles",
        components: {MessageBox, Loading, TableContent, Table},
        mounted() {
            this.loading = true;
            Utils.handleRequests(this.$router, async() => {
                await this.fetchRoles();

                this.loading = false;
            });
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                table: {
                    headers: [
                        'Role name', 'Permissions', ''
                    ],
                    rows: [],
                },
                loading: true,
                messageBox: null,
                messageBoxKey: 0,
            }
        },
        methods: {
            async deleteClick(e, entity) {
                e.stopPropagation();

                this.loading = true;
                try {
                    await Utils.handleRequests(this.$router, async() => {
                        const rolesConnector = ConnectorFactory.getConnector('roles');
                        await rolesConnector.delete(entity);
                        this.table.rows = this.table.rows.filter(role => role.entity !== entity);
                    });

                    this.messageBox = {
                        message: ROLE_DELETED,
                        type: TYPE_SUCCESS,
                    };
                } catch(e) {
                    this.messageBox = {
                        message: e.message,
                        type: TYPE_DANGER,
                    };
                }
                ++this.messageBoxKey;
                this.loading = false;
            },

            async fetchRoles() {
                const rolesConnector = ConnectorFactory.getConnector('roles');
                this.table.rows = await rolesConnector.getAll();
            }
        }
    }
</script>

<style scoped>

</style>