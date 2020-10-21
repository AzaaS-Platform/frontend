<template>
    <transition name="fade">
        <div class="modal" v-if="show">
            <div class="modal__backdrop" @click="closeModal()"/>

            <div class="modal__dialog">
                <div class="modal__body">
                    <slot/>
                </div>

                <div class="modal__footer">
                    <div class="mdl-dialog__actions">
                        <button type="button" class="mdl-button" @click="closeModal">Close window</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            onClose: {
                type: Function,
                default: () => {
                },
            },
        },
        data() {
            return {
                show: false
            };
        },
        methods: {
            closeModal() {
                this.show = false;
                document.querySelector("body").classList.remove("overflow-hidden");
                this.onClose();
            },
            openModal() {
                this.show = true;
                document.querySelector("body").classList.add("overflow-hidden");
            }
        }
    };
</script>


<style scoped>
    .modal {
        overflow-x:hidden;
        overflow-y:auto;
        position:fixed;
        display:flex;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:9;
    }

    .modal__backdrop {
        background-color:rgba(0, 0, 0, 0.3);
        position:fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:1;
    }

    .modal__dialog {
        background-color:#ffffff;
        position:relative;
        max-width:600px;
        margin:50px auto;
        display:flex;
        flex-direction:column;
        border-radius:5px;
        z-index:2;
        align-self:center;
    }

    @media screen and (max-width:992px) {
        .modal__dialog {
            width:90%;
        }
    }

    .modal__body {
        padding:10px 20px 10px;
        overflow:auto;
        display:flex;
        flex-direction:column;
        align-items:stretch;
    }

    .modal__footer {
        padding:10px 20px 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition:opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity:0;
    }
</style>