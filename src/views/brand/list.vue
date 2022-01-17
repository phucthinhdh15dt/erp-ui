<template>
    <div class="BrandList">
        <div class="card-head-title font-18 font-bold">Danh sách thương hiệu</div>
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="Brand"
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
        title: 'Mã thương hiệu',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        align: 'center',
    },
    {
        title: 'Mã code',
        dataIndex: 'code',
        key: 'code',
        width: 100,
        align: 'center',
    },
    {
        title: 'Tên thương hiệu',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        align: 'center',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: 200,
        align: 'center',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 200,
        align: 'center',
    },
];

const searchConfigs = {
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên thương hiệu',
    rowKey: 'brandId',
    urlParam: 'brand',
};

const filters = [];

const sortConfigs = [
    // {
    //     createdAt: { order: 'desc', format: 'strict_date_optional_time_nanos' },
    // },
];

export default defineComponent({
    name: 'BrandList',
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
