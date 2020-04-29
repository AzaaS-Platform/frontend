<template>
    <div>
        <div class="mdl-layout">
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th v-for="header in headers" :key="header" class="mdl-data-table__cell--non-numeric">
                        <slot name="header" :header="header" />
                    </th>
                </tr>
                </thead>
                <tbody>
                <slot name="row" v-for="row of currTable" :row="row" />
                </tbody>
            </table>
        </div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <Pagination :pages-num="Math.ceil(rows.length / maxRows)" :curr-page="page"/>
            <div class="mdl-layout-spacer"></div>
        </div>
    </div>
</template>

<script>
    import Pagination from "./Pagination.vue";

    export default {
        name: "Table",
        components: {Pagination},
        props: {
            headers: Array,
            rows: Array,
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
                return this.rows.slice((this.page - 1) * this.maxRows, (this.page - 1) * this.maxRows + this.maxRows);
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