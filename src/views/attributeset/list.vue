<template>
    <List
        :columns="columns"
        :filter-configs="filters"
        :search-configs="searchConfigs"
        :sort-configs="sortConfigs"
        name="AttributeSet"
    >
        <template #ActionArea><ActionArea /></template>
    </List>
</template>
<script>
import { defineComponent } from 'vue';
import ActionArea from './actionArea.vue';
import List from '@/components/attributeset/list/index.vue';

export const columns = [
    {
        title: 'Mã nhóm thuộc tính',
        dataIndex: 'id',
        key: 'id',
        slots: { customRender: 'id' },
        width: 100,
        align: 'center',
    },
    {
        title: 'Tên nhóm thuộc tính',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        align: 'left',
    },
    {
        title: 'Ngành hàng con',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 200,
        align: 'left',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 200,
        align: 'center',
    },
    {
        title: 'Loại',
        dataIndex: 'type',
        key: 'type',
        width: 150,
        align: 'center',
    },
];

const searchConfigs = {
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên nhóm thuộc tính',
    rowKey: 'id',
    urlParam: 'attributeSet',
};

const filters = [
    {
        type: 'Text',
        label: 'Danh mục',
        name: 'items.category.name',
    },
    {
        type: 'Text',
        label: 'Thương hiệu',
        name: 'items.name.name',
    },
    {
        type: 'Type',
        label: 'Loại',
        name: 'items.type',
    },
];

const sortConfigs = [
    {
        createdAt: { id: 'desc', format: 'strict_date_optional_time_nanos' },
    },
];

export default defineComponent({
    name: 'AttributeSetList',
    components: {
        List,
        ActionArea,
    },
    setup() {
        return { columns, filters, searchConfigs, sortConfigs };
    },
});
</script>
