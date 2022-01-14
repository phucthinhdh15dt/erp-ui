<template>
    <div>
        <div class="card-head-title font-18 font-bold">Danh sách nhóm thuộc tính</div>
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="AttributeSet"
        >
            <template #ActionArea><ActionArea /></template>
        </List>
    </div>
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
        title: 'Ngành hàng',
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
];

const searchConfigs = {
    fields: ['id', 'name'],
    placeholder: 'Nhập mã hoặc tên nhóm thuộc tính',
    rowKey: 'id',
    urlParam: 'attributeSet',
};

const filters = [
    {
        type: 'Selection',
        label: 'Danh mục',
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
];

const sortConfigs = [
    {
        'id.keyword': 'desc',
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
