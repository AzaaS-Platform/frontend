<template>
    <div>
        <TableContent header="Users" add-link="../add-user">
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
                            <button v-if="row.entity !== currentUserEntity"
                                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-red"
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
    import Token from '../../../main/storage/Token.js';
    import MessageBox, {TYPE_DANGER, TYPE_SUCCESS} from '../../elements/MessageBox.vue';

    const USER_DELETED = 'User deleted successfully';

    export default {
        name: "Users",
        components: {MessageBox, Loading, TableContent, Table},
        mounted() {
            this.loading = true;
            Utils.handleRequests(this.$router, async() => {
                await this.fetchUsers();
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
                        'Username', 'Roles', ''
                    ],
                    rows: [],
                },
                loading: true,
                roles: [],
                currentUserEntity: Token.extractUser(Token.restore()),
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
                        const usersConnector = ConnectorFactory.getConnector('users');
                        await usersConnector.delete(entity);
                        this.table.rows = this.table.rows.filter(user => user.entity !== entity);
                    });

                    this.messageBox = {
                        message: USER_DELETED,
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

            async fetchUsers() {
                const usersConnector = ConnectorFactory.getConnector('users');
                this.table.rows = await usersConnector.getAll();
            },

            async fetchRoles() {
                const rolesConnector = ConnectorFactory.getConnector('roles');
                this.roles = await rolesConnector.getAll();
            }
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>