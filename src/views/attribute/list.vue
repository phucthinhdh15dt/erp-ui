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
        dataIndex: 'code',
        key: 'code',
        width: 200,
        align: 'center',
    },
    {
        title: 'Tên thuộc tính',
        dataIndex: 'label',
        key: 'label',
        width: 300,
        align: 'center',
    },
    {
        title: 'Tính chất',
        dataIndex: 'uiComponentType',
        key: 'uiComponentType',
        width: 300,
        align: 'center',
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
    fields: ['code', 'name'],
    placeholder: 'Nhập mã hoặc tên thuộc tính',
    rowKey: 'code',
    urlParam: 'attribute',
};

const sortConfigs = [
    {
        idNum: 'desc',
    },
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
