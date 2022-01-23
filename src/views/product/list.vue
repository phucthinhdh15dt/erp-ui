<template>
    <div class="ProductList">
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="Product"
        >
            <template #ActionArea><ActionArea /></template>
            <template #ResultTable><ResultTable :columns="columns" :search-configs="searchConfigs" /></template>
        </List>
    </div>
</template>

<script>
import { defineComponent, provide, ref } from 'vue';
import ActionArea from './list/actionArea.vue';
import ResultTable from './list/resultTable.vue';
import List from '@/components/product/list/index.vue';
import { formatToCurrency } from '@/utils/number';
import { STATUS_PRODUCT } from '@/constants/product';

export const columns = [
    {
        title: 'STT',
        dataIndex: 'numberIndex',
        key: 'numberIndex',
        width: 100,
        align: 'center',
    },
    // {
    //     title: 'Thời gian tạo',
    //     dataIndex: 'createAt',
    //     key: 'createAt',
    //     width: 150,
    //     align: 'center',
    // },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
        key: 'code',
        width: 200,
        align: 'center',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 400,
        align: 'center',
    },
    {
        title: 'Ngành hàng',
        dataIndex: 'category',
        key: 'category',
        width: 250,
        align: 'center',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand',
        key: 'brand.name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Giá VAT',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        width: 150,
        align: 'center',
        customRender({ text }) {
            return formatToCurrency(text);
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
    },
];

const filters = [
    {
        type: 'DateRange',
        label: 'Thời gian',
        name: 'createdAt',
    },
    {
        type: 'Selection',
        label: 'Ngành hàng',
        key: 'category',
        name: 'category.id',
        configs: {
            dataMapping: true,
        },
    },
    {
        type: 'Selection',
        label: 'Thương hiệu',
        key: 'brand',
        name: 'brand.id',
        configs: {
            dataMapping: true,
        },
    },
    {
        type: 'Selection',
        label: 'Trạng thái',
        key: 'status',
        name: 'status',
        configs: {
            dataMapping: true,
            options: Object.values(STATUS_PRODUCT).map(_ => ({ value: _.code, label: _.label })),
        },
    },
];

const searchConfigs = {
    fields: ['code', 'name'],
    placeholder: 'Nhập mã hoặc tên sản phẩm',
    rowKey: 'id',
    urlParam: 'product',
};

const sortConfigs = [
    {
        idNum: 'desc',
    },
];

export default defineComponent({
    name: 'ProductList',
    components: {
        List,
        ActionArea,
        ResultTable,
    },
    setup() {
        const processingItem = ref(null);
        provide('processingItem', processingItem);

        return { columns, filters, searchConfigs, sortConfigs };
    },
});
</script>
