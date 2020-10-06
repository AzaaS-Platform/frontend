<template>
    <ul class="mdl-list">
        <li v-for="(element, idx) in data" :key="idx" class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <label ref="selectLabels" :for="idx" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                    <input type="checkbox" :id="idx" class="mdl-checkbox__input" :value="element"
                           :checked="selected.includes(element)" @change="onChange"/>
                    <span class="mdl-checkbox__label">{{element}}</span>
                </label>
            </span>
            <div v-if="removable" class="mdl-list__item-secondary-content">
                <button :for="idx"
                        class="mdl-button mdl-js-button mdl-button--icon button--colored mdl-button--mini-icon pull-right"
                        @click="removeElement(element)">
                    <i class="material-icons">clear</i>
                </button>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "SelectList",
        props: {
            elements: Array,
            initSelected: Array,
            removable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                data: [...this.elements],
                selected: [...this.initSelected],
            };
        },
        mounted() {
            // eslint-disable-next-line
            componentHandler.upgradeDom();
        },
        methods: {
            onChange(e) {
                let currentValue = [...this.selected];

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

            removeElement(element) {
                this.data = this.data.filter(item => item !== element);
                this.$emit('input', this.data);
            },
        },
    }
</script>

<style scoped>

</style>