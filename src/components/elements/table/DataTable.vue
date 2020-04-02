<template>
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
        <tr>
            <th v-for="header in headers" :key="header" class="mdl-data-table__cell--non-numeric">{{header}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in data" :key="row.id">
            <td class="mdl-data-table__cell--non-numeric">{{row.name}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{row.roles}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "DataTable",
        props: {
            headers: Array,
            data: Array,
            title: String
        }
    }
</script>

<style scoped>

</style>