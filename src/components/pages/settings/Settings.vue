<template>
    <div class="mdl-grid">
        <MFA/>
        <AllowedUrls/>
    </div>
</template>

<script>
import AllowedUrls from '@/components/elements/settings/AllowedUrls.vue';
import MFA from '@/components/elements/settings/MFA.vue';

export default {
    name: "Settings",
    components: {MFA, AllowedUrls},
}
</script>

<style scoped>

</style>