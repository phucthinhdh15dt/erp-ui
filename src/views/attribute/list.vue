<template>
    <div class="AttributeList"></div>
    <List
        :columns="columns"
        :filter-configs="filters"
        :search-configs="searchConfigs"
        :sort-configs="sortConfigs"
        name="Order"
    >
        <template #ActionArea><ActionArea /></template>
    </List>
</template>
<script>
import { defineComponent } from 'vue';
import ActionArea from './actionArea.vue';
import List from '@/components/attribute/list/index.vue';

export const columns = [
    {
        title: 'Mã nhóm thuộc tính',
        dataIndex: 'attributeId',
        key: 'attributeId',
        slots: { customRender: 'id' },
        width: 150,
        align: 'center',
    },
    {
        title: 'Tên nhóm thuộc tính',
        dataIndex: 'attributeName',
        key: 'attributeName',
        width: 200,
        align: 'center',
    },
    {
        title: 'Ngành hàng con',
        dataIndex: 'categoryChild',
        key: 'categoryChild',
        width: 150,
        align: 'center',
    },
    {
        title: 'Thương hiệu',
        dataIndex: 'brand',
        key: 'brand',
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
    fields: ['id', 'attributeName'],
    placeholder: 'Nhập mã hoặc tên nhóm thuộc tính',
    rowKey: 'attributeId',
    urlParam: 'attribute',
};

const filters = [
    {
        type: 'Text',
        label: 'Danh mục',
        name: 'categoryId',
    },
    {
        type: 'Text',
        label: 'Thương hiệu',
        name: 'items.brandId',
    },
    {
        type: 'Type',
        label: 'Loại',
        name: 'items.type',
    },
];

const sortConfigs = [
    {
        createdAt: { attribute: 'desc', format: 'strict_date_optional_time_nanos' },
    },
];

export default defineComponent({
    name: 'AttributeList',
    components: {
        List,
        ActionArea,
    },
    setup() {
        return { columns, filters, searchConfigs, sortConfigs };
    },
});
</script>
