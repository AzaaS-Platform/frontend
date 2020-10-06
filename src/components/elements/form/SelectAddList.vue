<template>
    <div>
        <SelectList :elements="elements" :init-selected="initSelected" :removable="true"/>
        <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" id="todo-input" v-model="element">
            <label class="mdl-textfield__label" for="todo-input">Dodaj element</label>
        </div>
    </div>
</template>

<script>
    import SelectList from './SelectList.vue';

    export default {
        name: "SelectAddList",
        components: {SelectList},
        props: {
            elements: Array,
            initSelected: Array
        },
        data() {
            return {
                data: [...this.elements],
                element: '',
            }
        },
        methods: {
            addElement() {
                if(this.element !== '' && !this.data.includes(this.element)) {
                    this.data.push(this.element);
                    this.element = '';
                    this.$emit('input', this.data);
                }
            },
        },
    }
</script>

<style scoped>

</style>