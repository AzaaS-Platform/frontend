<template>
    <div>
        <button id="more" class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-shadow--2dp settings-dropdown" for="more">
            <a class="mdl-menu__item" href="https://github.com/CreativeIT/getmdl-dashboard/issues">
                Support
            </a>
            <li class="mdl-menu__item">
                F.A.Q.
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "More"
    }
</script>

<style scoped>

</style>