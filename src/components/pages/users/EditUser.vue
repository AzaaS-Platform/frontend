<template>
    <AddUser v-if="user !== null && !loading" :user="user" header="Edit user"/>
    <div v-else-if="error" class="mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
        <span :class="`color-text--red`">{{ error }}</span>
    </div>
    <Loading v-else-if="loading"/>
    <NotFound v-else/>
</template>

<script>
import AddUser from "./AddUser.vue";
import NotFound from '../errors/NotFound.vue';
import Loading from '../../elements/Loading.vue';
import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
import Fetcher from '../../../main/connect/Fetcher.js';
import Utils from '../../../main/utils/Utils.js';

export default {
    name: "EditUser",
    components: {Loading, NotFound, AddUser},
    mounted() {
        this.loading = true;
        Utils.handleRequests(this.$router, async () => {
            await this.fetchUser(this.$route.params.id);

            this.loading = false;
        }).catch(e => {
            this.loading = false;
            this.error = e.message
        });
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                user: null,
                loading: true,
                error: '',
            };
        },
        methods: {
            async fetchUser(entity) {
                const usersConnector = ConnectorFactory.getConnector('users');
                this.user = await usersConnector.get(entity);
            }
        }
    }
</script>

<style scoped>

</style>