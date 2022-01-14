<template>
    <List
        :columns="columns"
        :filter-configs="filters"
        :search-configs="searchConfigs"
        :sort-configs="sortConfigs"
        name="Brand"
    >
        <template #ActionArea><ActionArea /></template>
    </List>
</template>
<script>
import { defineComponent } from 'vue';
import List from '@/components/list/index.vue';
import ActionArea from './actionArea.vue';
import { STATUS_BRAND } from '@/constants';

export const columns = [
    {
        title: 'Mã thương hiệu',
        dataIndex: 'id',
        key: 'id',
        slots: { customRender: 'id' },
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
        slots: { customRender: 'status' },
        key: 'status',
        width: 200,
        align: 'center',
    },
];

const searchConfigs = {
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên thương hiệu',
    rowKey: 'id',
    urlParam: 'brand',
};

const filters = [];

const sortConfigs = [];

export default defineComponent({
    name: 'BrandList',
    components: {
        List,
        ActionArea,
    },
    setup() {
        return { columns, filters, searchConfigs, sortConfigs };
    },
});
</script>
