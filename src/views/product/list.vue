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
import List from '@/components/list/index.vue';

export const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 200,
        align: 'center',
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'createAt',
        key: 'createAt',
        width: 150,
        align: 'center',
    },
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
        dataIndex: 'category.name',
        key: 'category.name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand.name',
        key: 'brand.name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Giá VAT',
        dataIndex: 'priceVat',
        key: 'priceVat',
        width: 150,
        align: 'center',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 300,
        align: 'center',
    },
];

const filters = [
    // {
    //     type: 'DateRange',
    //     label: 'Thời gian',
    //     name: 'createdAt',
    // },
];

const searchConfigs = {
    fields: ['code', 'name'],
    placeholder: 'Nhập mã hoặc tên sản phẩm',
    rowKey: 'code',
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
