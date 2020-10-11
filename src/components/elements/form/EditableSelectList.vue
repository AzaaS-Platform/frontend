<template>
    <div>
        <SelectList v-model="selected" @remove="removeElement" :key="selectListKey" :elements="data" :removable="true">
            <template #additionalElements>
                <li class="mdl-list__item">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="todo-input" v-model="element">
                        <label class="mdl-textfield__label" for="todo-input">Dodaj element</label>
                    </div>
                </li>
            </template>
        </SelectList>
        <div class="mdl-card__actions">
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect" @click="removeSelected">
                usuń zaznaczone
            </button>
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-shadow--8dp mdl-button--colored"
                    @click="addElement">
                <i class="material-icons mdl-js-ripple-effect">add</i>
            </button>
        </div>
    </div>
</template>

<script>
    import SelectList from './SelectList.vue';

    export default {
        name: "SelectAddList",
        components: {SelectList},
        props: {
            elements: Array
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        data() {
            return {
                data: [...this.elements],
                selected: [],
                selectListKey: 0,
                element: '',
            }
        },
        methods: {
            addElement() {
                if(this.element !== '' && !this.data.find(element => element.value === this.element)) {
                    this.data.push({value: this.element, name: this.element});
                    this.element = '';
                    ++this.selectListKey;
                    this.$emit('input', this.data);
                }
            },

            removeElement(element) {
                this.data = this.data.filter(item => item.value !== element.value);
                ++this.selectListKey;
                this.$emit('input', this.data);
            },

            removeSelected() {
                this.data = this.data.filter(item => !this.selected.find(selected => item.value === selected.value));
                ++this.selectListKey;
                this.$emit('input', this.data);
            },
        },
    }
</script>

<style scoped>

</style>