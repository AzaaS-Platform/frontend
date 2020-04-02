<template>
    <main class="mdl-layout__content">
        <Header :button="button"/>
        <Table :table="table" />
    </main>
</template>

<script>
    import Roles from "../../main/Roles.js";

    import Header from "../elements/Header.vue";
    import Table from "../elements/table/Table.vue";

    export default {
        name: "Roles",
        components: {Table, Header},
        data() {
            return {
                table: {
                    headers: [
                        'Nazwa roli', 'Uprawnienia'
                    ],
                    content: Roles.fetch(),
                },
                button: {
                    text: 'Dodaj rolę',
                    icon: 'add',
                    link: '/add-role'
                },
            }
        },
    }
</script>

<style scoped>

</style>