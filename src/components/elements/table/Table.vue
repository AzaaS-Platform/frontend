<template>
    <div>
        <div class="mdl-layout">
            <DataTable :data="currTable" :headers="table.headers" />
        </div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <Pagination :pages-num="Math.ceil(table.content.length / maxRows)" :curr-page="page" />
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
            table: Object,
            maxRows: {
                type: Number,
                default: 5
            },
        },
        data() {
            return {
                page: parseInt(this.$route.params.page) || 1,
            }
        },
        computed: {
            currTable() {
                return this.table.content.slice((this.page - 1) * this.maxRows, (this.page - 1) * this.maxRows + this.maxRows);
            },
        },
        watch: {
            $route() {
                this.page = parseInt(this.$route.params.page) || 1;
            }
        }
    }
</script>

<style scoped>

</style>