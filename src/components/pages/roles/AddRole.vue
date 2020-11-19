<template>
    <div>
        <div v-if="!loading"
             class="mdl-grid mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
                <div class="mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title">
                        <h5 class="mdl-card__title-text text-color--white">{{header}}</h5>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <form class="form form--basic">
                            <div class="mdl-grid">
                                <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone form__article">
                                    <div ref="mdlComponents" class="mdl-textfield mdl-js-textfield full-size">
                                        <input class="mdl-textfield__input" type="text" id="name" v-model="roleName">
                                        <label class="mdl-textfield__label" for="name">Name</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
                <div class="mdl-card mdl-shadow--2dp todo">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">Permissions</h2>
                    </div>
                    <EditableSelectList :elements="mappedPermissions" v-model="mappedPermissions"/>
                </div>
            </div>
            <div
                class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
                <button
                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"
                    @click="submitForm">
                    <i class="material-icons">assignment_returned</i>
                    Save
                </button>
            </div>
        </div>
        <div v-else-if="error" class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
            <span :class="`color-text--red`">{{ error }}</span>
        </div>
        <Loading v-else/>
        <MessageBox v-if="!!messageBox" :key="messageBoxKey" :message="messageBox.message" :type="messageBox.type"/>
    </div>
</template>

<script>
import Loading from '../../elements/Loading.vue';
import EditableSelectList from '../../elements/form/EditableSelectList.vue';
import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
import Fetcher from '../../../main/connect/Fetcher.js';
import Utils from '../../../main/utils/Utils.js';
import MessageBox, {TYPE_DANGER, TYPE_SUCCESS} from '../../elements/MessageBox.vue';
import Token from "@/main/storage/Token.js";

const ROLE_MODIFIED = 'Role modified successfully';
const ROLE_ADDED = 'Role added successfully';

export default {
    name: "AddRole",
    components: {MessageBox, EditableSelectList, Loading},
    props: {
        role: {
            type: Object,
                default: null,
            },
            header: {
                type: String,
                default: 'Add role'
            },
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();

            const isAdmin = Token.extractIsAdmin(Token.restore());
            this.loading = !isAdmin;
            if (!isAdmin) this.error = 'Forbidden. Only administrators are allowed to access the configuration.';
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                roleName: this.role ? this.role.name : '',
                mappedPermissions: this.role ? this.role.permissions.map(permission => ({
                    value: permission,
                    name: permission
                })) : [],
                loading: false,
                error: '',
                messageBox: null,
                messageBoxKey: 0,
            }
        },
        methods: {
            async submitForm(e) {
                e.preventDefault();

                const rolesConnector = ConnectorFactory.getConnector('roles');
                this.loading = true;
                try {
                    if(this.role !== null) {
                        await Utils.handleRequests(this.$router, async() => {
                            await rolesConnector.modify(this.role.entity, {
                                name: this.roleName,
                                permissions: [...this.mappedPermissions.map(permission => permission.value)]
                            });
                        });

                        this.messageBox = {
                            message: ROLE_MODIFIED,
                            type: TYPE_SUCCESS,
                        };
                    } else {
                        await Utils.handleRequests(this.$router, async() => {
                            await rolesConnector.add({
                                name: this.roleName,
                                permissions: [...this.mappedPermissions.map(permission => permission.value)]
                            });
                        });

                        this.messageBox = {
                            message: ROLE_ADDED,
                            type: TYPE_SUCCESS,
                        };
                    }
                } catch(e) {
                    this.messageBox = {
                        message: e.message,
                        type: TYPE_DANGER,
                    };
                }
                ++this.messageBoxKey;
                this.loading = false;
            }
        },
    }
</script>

<style scoped>

</style>