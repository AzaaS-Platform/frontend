<template>
    <AddUser v-if="user !== null && !loading" :user="user"/>
    <Loading v-else-if="loading"/>
    <NotFound v-else/>
</template>

<script>
    import AddUser from "./AddUser.vue";
    import NotFound from '../errors/NotFound.vue';
    import Loading from '../../elements/Loading.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';
    import Fetcher from '../../../main/connect/Fetcher.js';

    export default {
        name: "EditUser",
        components: {Loading, NotFound, AddUser},
        mounted() {
            this.fetchUser(this.$route.params.id);
        },
        beforeDestroy() {
            Fetcher.abortAll();
        },
        data() {
            return {
                user: null,
                loading: true
            };
        },
        methods: {
            async fetchUser(entity) {
                try {
                    const usersConnector = ConnectorFactory.getConnector('users');
                    this.user = await usersConnector.get(entity);
                } catch(e) {
                    this.user = null;
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>