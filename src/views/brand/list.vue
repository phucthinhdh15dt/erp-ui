<template>
    <Spin tip="Đang tải..." :spinning="loading">
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="Brand"
        >
            <template #ActionArea><ActionArea /></template>
        </List>
    </Spin>
</template>
<script>
import { defineComponent, provide, watch } from 'vue';
import { Spin } from 'ant-design-vue';
import List from '@/components/list/index.vue';
import ActionArea from './actionArea.vue';
import { useBrand } from '@/composables/brand/index';
import { useStore } from 'vuex';

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
    {
        title: 'Thao tác',
        dataIndex: 'event',
        slots: { customRender: 'event' },
        key: 'event',
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
        Spin,
    },
    setup() {
        const store = useStore();
        const { getBrandId, result, loading } = useBrand();
        const getDetail = id => {
            getBrandId(id);
        };
        provide('onGetDetail', getDetail);

        watch(
            () => result.value,
            () => {
                if (result.value && !loading.value) {
                    store.commit('brand/setIsOpen', true);
                    store.commit('brand/setIsEdit', true);
                }
            }
        );

        return { columns, filters, searchConfigs, sortConfigs, loading };
    },
});
</script>
