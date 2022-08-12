<template>
    <div>
        <div class="field-checkbox">
            <CheckBox class="ferro-checkbox" :value="category" v-model="selectedCategories" :disabled="ids === 4"/>
            <label :for="ids">{{name}}</label>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        ids: Number,
        name: String,
        category: Object
    },
    setup(props) {
        const selectedCategories = ref();
        return { props, selectedCategories };
    }
}
</script>

<style lang="scss" scoped>
::v-deep(.ferro-checkbox.p-checkbox) {
    .p-checkbox-box.p-highlight {
        background: var(--orange-400) !important;
        color: var(--surface-0) !important;
    }
}
</style>
