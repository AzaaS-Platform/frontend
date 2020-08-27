<template>
    <div class="mdl-grid ui-tables">
        <div class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">{{header}}</h1>
                </div>
                <div class="mdl-card__supporting-text no-padding">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TableContent",
        props: {
            header: String
        }
    }
</script>

<style scoped>

</style>