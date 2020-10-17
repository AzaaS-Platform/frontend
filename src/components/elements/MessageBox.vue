<template>
    <div v-if="show" :class="`message-box alert-${type}`">
        <span>{{message}}</span>
    </div>
</template>

<script>
    export default {
        name: "MessageBox",
        props: {
            message: String,
            type: String,
            time: {
                type: Number,
                default: 5000
            },
        },
        beforeDestroy() {
            clearTimeout(this.timeoutId);
        },
        data() {
            return {
                show: true,
                timeoutId: this.time > 0 ? setTimeout(() => {
                    this.show = false;
                }, this.time) : null,
            };
        },
    }
</script>

<style scoped>
    .message-box {
        display:inline-flex;
        position:fixed;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        z-index:1;
        padding:.75rem 1.25rem;
        margin-bottom:1rem;
        border:1px solid transparent;
        border-radius:.35rem;
    }

    .alert-danger {
        color:#000000;
        background-color:#CF6679;
        border-color:#B00020;
    }

    .alert-success {
        color:#000000;
        background-color:#79cf66;
        border-color:#1ab000;
    }
</style>