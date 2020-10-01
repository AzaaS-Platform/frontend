<template>
    <div class="mdl-card mdl-shadow--2dp todo">
        <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">{{header}}</h2>
        </div>
        <div class="mdl-card__supporting-text">
            <ul class="mdl-list">
                <li v-for="(element, idx) in data" :key="idx" class="mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <label ref="selectLabels" :for="idx" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                            <input type="checkbox" :id="idx" class="mdl-checkbox__input" :value="element"
                                   :checked="selected.includes(element)" @change="onChange"/>
                            <span class="mdl-checkbox__label">{{element}}</span>
                        </label>
                    </span>
                    <div v-if="adding" class="mdl-list__item-secondary-content">
                        <button :for="idx"
                                class="mdl-button mdl-js-button mdl-button--icon button--colored mdl-button--mini-icon pull-right"
                                @click="removeElement(element)">
                            <i class="material-icons">clear</i>
                        </button>
                    </div>
                </li>
                <li v-if="adding" class="mdl-list__item">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="todo-input" v-model="element">
                        <label class="mdl-textfield__label" for="todo-input">Dodaj element</label>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="adding" class="mdl-card__actions">
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
    export default {
        name: "FormList",
        props: {
            elements: Array,
            value: Array,
            adding: Boolean,
            header: String
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        updated() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        data() {
            return {
                selected: [],
                data: this.adding ? [...this.value] : [...this.elements],
                element: ''
            }
        },
        methods: {
            onChange(e) {
                let currentValue;
                if(this.adding) {
                    currentValue = [...this.selected];
                } else {
                    currentValue = [...this.value];
                }

                if(e.target.checked) {
                    currentValue.push(e.target.value)
                } else {
                    currentValue = currentValue.filter(item => item !== e.target.value);
                }

                this.selected = [...currentValue];
                if(!this.adding) {
                    this.$emit('input', currentValue);
                }
            },

            addElement() {
                if(this.element !== '' && !this.data.includes(this.element)) {
                    this.data.push(this.element);
                    this.element = '';
                    this.$emit('input', this.data);
                }
            },

            removeElement(element) {
                this.data = this.data.filter(item => item !== element);
                this.$emit('input', this.data);
            },

            removeSelected() {
                this.data = this.data.filter(item => !this.selected.includes(item));
                this.$emit('input', this.data);
                this.selected = [];

                for(let el of this.$refs.selectLabels) {
                    el.classList.remove('is-checked');
                }
            }
        }
    }
</script>

<style scoped>

</style>