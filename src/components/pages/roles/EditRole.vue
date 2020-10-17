<template>
    <AddRole v-if="role !== null && !loading" :role="role"/>
    <Loading v-else-if="loading"/>
    <NotFound v-else/>
</template>

<script>
    import AddRole from "./AddRole.vue";
    import NotFound from '../errors/NotFound.vue';
    import Loading from '../../elements/Loading.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';
    import Utils from '../../../main/utils/Utils.js';

    export default {
        name: "EditRole",
        components: {Loading, NotFound, AddRole},
        mounted() {
            this.loading = true;
            Utils.handleRequests(this.$router, async() => {
                await this.fetchRole(this.$route.params.id);

                this.loading = false;
            });
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                role: null,
                loading: true
            };
        },
        methods: {
            async fetchRole(entity) {
                const rolesConnector = ConnectorFactory.getConnector('roles');
                this.role = await rolesConnector.get(entity);
            }
        }
    }
</script>

<style scoped>

</style>