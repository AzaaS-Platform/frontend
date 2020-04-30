<template>
    <div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <form>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="sample3">
                    <label class="mdl-textfield__label" for="sample3">Nazwa użytkownika...</label>
                </div>
            </form>
            <div class="mdl-layout-spacer"></div>
        </div>
        <div class="mdl-grid">
            <div class="mdl-layout-spacer"></div>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue-700 mdl-color-text--white">
                dodaj
            </button>
            <div class="mdl-layout-spacer"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddUser",
        mounted() {
        }
    }
</script>

<style scoped>

</style>