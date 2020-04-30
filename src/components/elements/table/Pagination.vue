<template>
    <div>
        <router-link :to="`../${prevPage}`" append :event="prevPage ? 'click' : ''" :class="{'mdl-button--disabled': !prevPage}" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_back_ios</i>
        </router-link>
        <router-link :to="`../${i}`" append v-for="i in range(this.start, this.end)" :key="i"><button class="mdl-button mdl-js-button">{{i}}</button></router-link>
        <router-link :to="`../${nextPage}`" append :event="nextPage ? 'click' : ''" :class="{'mdl-button--disabled': !nextPage}" class="mdl-button mdl-js-button mdl-button--icon mdl-color-text--accent">
            <i class="material-icons">arrow_forward_ios</i>
        </router-link>
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
                start: Math.max(this.currPage - this.radius, 1),
                end: Math.min(this.currPage + this.radius, this.pagesNum),
            }
        },
        computed: {
            prevPage() {
                return this.currPage - 1 > 0 ? this.currPage - 1 : false;
            },
            nextPage() {
                return this.currPage + 1 <= this.pagesNum ? this.currPage + 1 : false;
            },
        },
        methods: {
            range(a, b) {
                let r = [];
                for(let i = a; i <= b; i++) {
                    r.push(i);
                }
                return r;
            }
        },
    }
</script>

<style scoped>

</style>