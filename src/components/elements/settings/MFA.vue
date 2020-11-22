<template>
    <div
        class="mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
            <h1 class="mdl-card__title-text">Two-factor authentication</h1>
        </div>

        <div class="mdl-card__supporting-text">
            <label ref="mfaCheck" v-show="!loading"
                   class="mdl-switch mdl-js-switch mdl-js-ripple-effect switch--colored-green"
                   for="switch-1">
                <input @change="tfaChange" type="checkbox" id="switch-1" class="mdl-switch__input"
                       v-model="tfaSwitch">
                <span class="mdl-switch__label">{{tfaText}}</span>
            </label>
            <Loading v-show="loading"/>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/elements/Loading.vue';
import Utils from '@/main/utils/Utils.js';
import ConnectorFactory from '@/main/connect/ConnectorFactory.js';

const MFA_OFF = 'Enable two-factor authentication.';
const MFA_ON = 'Two-factor authentication enabled.';

export default {
    name: "MFA",
    components: {Loading},
    mounted() {
        // eslint-disable-next-line
        componentHandler.upgradeDom();

        this.loading = true;
        Utils.handleRequests(this.$router, async() => {
            await this.fetchMFA();
            this.loading = false;
        });
    },
    data() {
        return {
            tfaSwitch: false,
            mfaEnabled: false,
            loading: true,
        }
    },
    computed: {
        tfaText() {
            return this.tfaSwitch ? MFA_ON : MFA_OFF;
        },
    },
    methods: {
        async tfaChange() {
            if(this.mfaEnabled) {
                try {
                    this.loading = true;
                    const mfaConnector = ConnectorFactory.getConnector('mfa');
                    await mfaConnector.delete();
                    this.mfaEnabled = false;
                } catch(e) {
                    this.$refs.mfaCheck.MaterialSwitch.off();
                }
                this.loading = false;
            } else {
                this.$root.$emit('openSettingsModal');
                this.mfaEnabled = true;
            }
        },

        async fetchMFA() {
            const mfaConnector = ConnectorFactory.getConnector('mfa');
            const mfa = await mfaConnector.get();
            if(mfa.has2FAEnabled) {
                this.$refs.mfaCheck.MaterialSwitch.on();
            }
            this.mfaEnabled = mfa.has2FAEnabled;
        },
    },
}
</script>

<style scoped>
</style>