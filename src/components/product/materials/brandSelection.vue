<template>
    <div>
        <Select :value="value" :options="brands" :filter-option="filterOption" show-search @change="onChange"></Select>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { Select } from 'ant-design-vue';
import { useGetAllBrand } from '@/composables/brand';
import { filterOption } from '@/utils/common';

const props = defineProps({
    value: { type: String, default: null },
});
const emits = defineEmits(['change']);
const { value } = toRefs(props);

const { result: brands } = useGetAllBrand();

const onChange = val => {
    emits('change', val);
};
</script>
