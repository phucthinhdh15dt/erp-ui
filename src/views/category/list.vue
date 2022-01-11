<template>
    <div class="CategoryList">
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="ProductCategory"
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
        title: 'Mã ngành hàng',
        dataIndex: 'id',
        key: 'id',
        width: 140,
        align: 'right',
    },
    {
        title: 'Tên ngành hàng',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: 'Ngành hàng con',
        dataIndex: 'subCategory',
        key: 'subCategory',
        width: 300,
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
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
    fields: ['id'],
    placeholder: 'Nhập mã ngành hàng',
    rowKey: 'categoryId',
    urlParam: 'category',
};

const sortConfigs = [
    // {
    //     createdAt: { order: 'desc', format: 'strict_date_optional_time_nanos' },
    // },
];

export default defineComponent({
    name: 'CategoryList',
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
