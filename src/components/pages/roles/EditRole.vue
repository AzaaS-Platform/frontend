<template>
    <AddRole v-if="role !== null && !loading" :role="role"/>
    <NotFound v-else-if="role === null"/>
    <Loading v-else/>
</template>

<script>
    import AddRole from "./AddRole.vue";
    import NotFound from '../errors/NotFound.vue';
    import Loading from '../../elements/Loading.vue';
    import Connector from '../../../main/connect/Connector.js';

    const connector = new Connector('groups/');

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
                    this.role = connector.get(entity);
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