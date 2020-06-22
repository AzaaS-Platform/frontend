<template>
    <main class="mdl-layout__content">
        <Header mb-href="/users" bb-href="/add-role">
            <template #main-button>Użytkownicy</template>
            <template #back-button>Dodaj Role</template>
        </Header>
        <Table :headers="table.headers" :rows="table.rows">
            <template #header="{header}">{{header}}</template>
            <template #row="{row}">
                <router-link :to="`../edit-role/${row.id}`" tag="tr" class="cursor-pointer">
                    <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <div v-for="permission of row.permissions" :key="permission">{{permission}}</div>
                    </td>
                </router-link>
            </template>
        </Table>
    </main>
</template>

<script>
    import Roles from "../../../main/Roles.js";

    import Header from "../../elements/Header.vue";
    import Table from "../../elements/table/Table.vue";

    export default {
        name: "Roles",
        components: {Table, Header},
        created() {
            this.getDataFromApi()
        },
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa roli', 'Uprawnienia'
                    ],
                    rows: [],
                },
            }
        },
        methods: {
            async getDataFromApi() {
                try {
                    this.table.rows = await Roles.fetch("6aa40429-c52a-4ef2-a38b-4151af1946c2");
                } catch(e) {
                    console.error(e);
                }
            }
        }
    }
</script>

<style scoped>
    .cursor-pointer {
        cursor:pointer;
    }
</style>