<template>
    <div>
        <Select
            :value="value"
            :options="categories"
            :filter-option="filterOption"
            show-search
            allow-clear
            @change="onChange"
        ></Select>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { Select } from 'ant-design-vue';
import { useGetAllCategory } from '@/composables/product/category';
import { filterOption } from '@/utils/common';

const props = defineProps({
    value: { type: String, default: null },
});
const emits = defineEmits(['change']);
const { value } = toRefs(props);
const { result: categories } = useGetAllCategory();

const onChange = val => {
    debugger;
    emits('change', val);
};
</script>
