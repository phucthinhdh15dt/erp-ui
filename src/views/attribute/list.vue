<template>
    <div class="AttributeList">
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="Attribute"
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
        title: 'Mã thuộc tính',
        dataIndex: 'id',
        key: 'id',
        width: 140,
        align: 'center',
    },
    {
        title: 'Mã Code',
        dataIndex: 'code',
        key: 'code',
        width: 200,
    },
    {
        title: 'Tên thuộc tính',
        dataIndex: 'label',
        key: 'label',
        width: 300,
    },
    {
        title: 'Tính chât',
        dataIndex: 'uiComponentType',
        key: 'uiComponentType',
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
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên ngành hàng',
    rowKey: 'categoryId',
    urlParam: 'category',
};

const sortConfigs = [
    // {
    //     createdAt: { order: 'desc', format: 'strict_date_optional_time_nanos' },
    // },
];

export default defineComponent({
    name: 'AttributeList',
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
