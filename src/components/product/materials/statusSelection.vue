<template>
    <div>
        <Select
            :value="value"
            :options="status"
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
// import { useGetAllCategory } from '@/composables/product/category';
import { filterOption } from '@/utils/common';

const props = defineProps({
    value: { type: String, default: null },
});
const emits = defineEmits(['change']);
const { value } = toRefs(props);
// const { result: categories } = useGetAllCategory();

const status = [
    {
        value: 'SALE',
        label: 'Đang bán',
    },
    {
        value: 'IN_PRODUCTION',
        label: 'Đang sản xuất',
    },
    {
        value: 'OUT_OF_STOCK',
        label: 'Hết hàng',
    },
];

const onChange = val => {
    emits('change', val);
};
</script>
