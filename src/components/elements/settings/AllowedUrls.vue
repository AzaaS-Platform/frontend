<template>
    <div v-if="isAdmin" class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
        <div class="mdl-card mdl-shadow--2dp todo">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Allowed URLs</h2>
            </div>
            <EditableSelectList v-if="!loading" :elements="allowedUrls" v-model="allowedUrls"/>
            <Loading v-else/>
        </div>
        <div v-if="!loading"
             class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-typography--text-right">
            <button
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--colored-light-blue"
                @click="submitForm">
                <i class="material-icons">assignment_returned</i>
                Save URLs
            </button>
        </div>

        <MessageBox v-if="!!messageBox" :key="messageBoxKey" :message="messageBox.message" :type="messageBox.type"/>
    </div>
</template>

<script>
import Loading from '@/components/elements/Loading.vue';
import EditableSelectList from '@/components/elements/form/EditableSelectList.vue';
import Utils from '@/main/utils/Utils.js';
import Token from '@/main/storage/Token.js';
import ConnectorFactory from '@/main/connect/ConnectorFactory.js';
import MessageBox, {TYPE_DANGER, TYPE_SUCCESS} from '@/components/elements/MessageBox.vue';

const ALLOWED_URLS_MODIFIED = 'Allowed URLs modified successfully';

export default {
    name: "AllowedUrls",
    components: {MessageBox, Loading, EditableSelectList},
    mounted() {
        // eslint-disable-next-line
        componentHandler.upgradeDom();

        if(this.isAdmin) {
            Utils.handleRequests(this.$router, async() => {
                await this.fetchAllowedUrls();
                this.loading = false;
            });
        }
    },
    data() {
        return {
            loading: true,
            isAdmin: Token.extractIsAdmin(Token.restore()),
            allowedUrls: [],
            messageBox: null,
            messageBoxKey: 0,
        }
    },
    methods: {
        async fetchAllowedUrls() {
            // eslint-disable-next-line no-unused-vars
            const allowedUrlsConnector = ConnectorFactory.getConnector('allowedUrls');
            this.allowedUrls = (await allowedUrlsConnector.get()).map(url => ({value: url, name: url}));
        },

        async submitForm(e) {
            e.preventDefault();

            const allowedUrlsConnector = ConnectorFactory.getConnector('allowedUrls');
            this.loading = true;
            try {
                await Utils.handleRequests(this.$router, async() => {
                    await allowedUrlsConnector.modify('', {
                        allowedUrls: [
                            ...this.allowedUrls.map(url => url.value)
                        ]
                    });
                });

                this.messageBox = {
                    message: ALLOWED_URLS_MODIFIED,
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
    },
}
</script>

<style scoped>

</style>