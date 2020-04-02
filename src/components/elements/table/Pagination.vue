<template>
    <div>
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_back_ios</i>
        </button>
        <router-link :to="`../${i - 1}`" append v-for="i in range(this.start, this.end)" :key="i"><button class="mdl-button mdl-js-button">{{i}}</button></router-link>
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_forward_ios</i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            pagesNum: Number,
            currPage: Number,
            radius: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                start: Math.max(this.currPage - this.radius + 1, 1),
                end: Math.min(this.currPage + this.radius + 1, this.pagesNum),
            }
        },
        methods: {
            range(a, b) {
                let r = [];
                for(let i = a; i <= b; i++) {
                    r.push(i);
                }
                return r;
            }
        }
    }
</script>

<style scoped>

</style>