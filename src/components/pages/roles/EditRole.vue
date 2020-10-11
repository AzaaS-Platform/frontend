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

    export default {
        name: "EditRole",
        components: {Loading, NotFound, AddRole},
        mounted() {
            this.fetchRole(this.$route.params.id);
        },
        data() {
            return {
                role: null,
                loading: true
            };
        },
        methods: {
            async fetchRole(entity) {
                try {
                    const rolesConnector = ConnectorFactory.getConnector('roles');
                    this.role = await rolesConnector.get(entity);
                } catch(e) {
                    this.role = null;
                } finally {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>