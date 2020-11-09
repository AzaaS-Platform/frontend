<template>
    <div class="mdl-layout__drawer">
        <header>Azaas</header>
        <div class="scroll__wrapper" id="scroll__wrapper">
            <div class="scroller" id="scroller">
                <div class="scroll__container" id="scroll__container">
                    <nav class="mdl-navigation">
                        <router-link to="/dashboard/roles" tag="a" class="mdl-navigation__link">
                            <i class="material-icons" role="presentation">dashboard</i>
                            Roles
                        </router-link>
                        <router-link to="/dashboard/users" tag="a" class="mdl-navigation__link">
                            <i class="material-icons" role="presentation">person</i>
                            Users
                        </router-link>
                    </nav>
                </div>
            </div>
            <div class='scroller__bar' id="scroller__bar"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Drawer"
    }
</script>

<style scoped>

</style>