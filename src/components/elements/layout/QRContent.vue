<template>
    <div v-if="!loading" class="qr-content">
        <div class="qr-content__text">
            Scan this code with your authentication app.
        </div>
        <div class="qr-content__img">
            <img :src="qrcode" alt="QR code"/>
        </div>
        <div class="qr-content__text">
            {{base32}}
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
    import Utils from '../../../main/utils/Utils.js';
    import Loading from '../Loading.vue';
    import ConnectorFactory from '../../../main/connect/ConnectorFactory.js';

    export default {
        name: "QRContent",
        components: {Loading},
        props: {
            img: String,
        },
        data() {
            return {
                loading: true,
                base32: '',
                qrcode: '',
            }
        },
        mounted() {
            this.loading = true;
            Utils.handleRequests(this.$router, async() => {
                await this.enableMFA();

                this.loading = false;
            });
        },
        methods: {
            async enableMFA() {
                const mfaConnector = ConnectorFactory.getConnector('mfa');
                const mfa = await mfaConnector.add();

                this.qrcode = mfa.qrcode;
                this.base32 = mfa.base32;
            }
        },
    }
</script>

<style scoped>
    .qr-content__text {
        text-align:center;
        margin:8px;
    }

    .qr-content__img {
        display:flex;
        justify-content:center;
    }

    .qr-content__img > img {
        max-width:200px;
    }
</style>