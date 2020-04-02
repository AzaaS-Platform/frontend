<template>
    <div>
        <div class="mdl-layout">
            <DataTable :data="currTable" :headers="table.headers" title="Użytkownicy"/>
        </div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <Pagination />
            <div class="mdl-layout-spacer"></div>
        </div>
    </div>
</template>

<script>
    import DataTable from "./DataTable.vue";
    import Pagination from "./Pagination.vue";
    export default {
        name: "Table",
        components: {Pagination, DataTable},
        props: {
            table: Object
        },
        data() {
            return {
                page: parseInt(this.$route.params.page) || 0,
            }
        },
        computed: {
            currTable() {
                return this.table.content.slice(this.page * 5, this.page * 5 + 5);
            }
        },
        watch: {
            $route() {
                this.page = parseInt(this.$route.params.page) || 0;
            }
        }
    }
</script>

<style scoped>

</style>