<template>
    <main class="mdl-layout__content">
        <Header :button="button"/>
        <div class="mdl-layout">
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th v-for="header in table.headers" :key="header" class="mdl-data-table__cell--non-numeric">{{header}}</th>
                </tr>
                </thead>
                <tbody>
                <router-link v-for="row in currTable" :to="`../role/${row.id}`" :key="row.id" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">{{row.privileges.join(', ')}}</td>
                </router-link>
                </tbody>
            </table>
        </div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <Pagination :pages-num="Math.ceil(table.content.length / maxRows)" :curr-page="page" />
            <div class="mdl-layout-spacer"></div>
        </div>
    </main>
</template>

<script>
    import Roles from "../../../main/Roles.js";

    import Header from "../../elements/Header.vue";
    import Pagination from "../../elements/table/Pagination.vue";

    export default {
        name: "Roles",
        components: {Pagination, Header},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa roli', 'Uprawnienia'
                    ],
                    content: Roles.fetch(),
                },
                maxRows: 5,
                button: {
                    text: 'Dodaj rolę',
                    icon: 'add',
                    link: '/add-role'
                },
            }
        },
        computed: {
            page() { return parseInt(this.$route.params.page) || 1 },
            currTable() {
                return this.table.content.slice((this.page - 1) * this.maxRows, (this.page - 1) * this.maxRows + this.maxRows);
            },
        },
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>