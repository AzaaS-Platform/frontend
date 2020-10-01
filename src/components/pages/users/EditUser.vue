<template>
    <AddUser v-if="user !== null && !loading" :user="user"/>
    <NotFound v-else-if="user === null"/>
    <Loading v-else/>
</template>

<script>
    import AddUser from "./AddUser.vue";
    import NotFound from '../errors/NotFound.vue';
    import Loading from '../../elements/Loading.vue';
    import Connector from '../../../main/connect/Connector.js';

    const connector = new Connector('users/');

    export default {
        name: "EditUser",
        components: {Loading, NotFound, AddUser},
        mounted() {
            this.fetchUser(this.$route.params.id);
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
                    this.user = await connector.get(entity);
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