<template>
    <div class="Result">
        <Table
            :data-source="searchResult.data"
            :columns="columns"
            :loading="isLoading"
            :pagination="pagination"
            :row-key="record => record[searchConfigs.rowKey]"
            :scroll="{ x: 1000 }"
            @change="onChange"
        >
            <template #bodyCell="{ column, text, record, index }">
                <template v-if="column.dataIndex === 'numberIndex'">
                    <span>
                        {{ index + 1 }}
                    </span>
                </template>
                <template v-if="column.dataIndex === 'createAt'">
                    <Datetime :value="status" />
                </template>
                <template v-if="column.dataIndex === 'category'">
                    <span v-if="record.categoryNames">{{ record.categoryNames.join(', ') }}</span>
                </template>
                <template v-if="column.dataIndex === 'brand'">
                    <span v-if="record.brand">{{ record.brand.name }}</span>
                </template>
                <template v-if="column.dataIndex === 'code'">
                    <a class="id-style" :href="`/${searchConfigs.urlParam}/${record.id}`">#{{ text }}</a>
                </template>
                <template v-if="column.dataIndex === 'status'">
                    <Status v-if="record.status" :code="record.status" :list-status="STATUS_PRODUCT" />
                </template>
            </template>
        </Table>
    </div>
</template>

<script>
import { defineComponent, computed, inject, watch } from 'vue';
import { Table } from 'ant-design-vue';
import { useStore } from 'vuex';
import Status from '@/components/common/status.vue';
import { STATUS_PRODUCT } from '@/constants/product';
import Datetime from '@/components/common/datetime.vue';
import { getOr } from 'lodash/fp';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'Result',
    components: { Table, Status, Datetime },
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        searchConfigs: {
            type: Object,
            default: () => {},
        },
    },
    setup() {
        const store = useStore();
        const onSearch = inject('onSearch');
        const processingItem = inject('processingItem');
        const searchResult = computed(() => store.state.list.results);
        const isLoading = computed(() => store.state.list.isLoading);
        const paginationStored = computed(() => store.state.list.pagination);
        const selectedRowKeys = computed(() => store.state.list.selectedRow);
        const progress = computed(() => store.state.list.progress);

        const onChange = pagination => {
            const { current } = pagination;
            store.commit('list/setSearchSelectedRow', []);
            store.commit('list/setSearchPagination', {
                ...paginationStored.value,
                current,
            });
        };

        const pagination = computed(() => ({
            total: searchResult.value.total,
            current: paginationStored.value.current,
            defaultPageSize: paginationStored.value.defaultPageSize,
            hideOnSinglePage: true,
        }));

        watch(
            paginationStored,
            () => {
                store.commit('list/setSearchSelectedAll', false);
                onSearch();
            },
            { deep: true }
        );

        const onChangeSelected = e => {
            const value = e.target.value;
            store.commit('list/setSearchSelectedRow', value);
        };

        const getStatusColor = record => {
            let color = getOr('#000', 'color', STATUS[record.status]);
            if (record.status === STATUS.PUBLISHED.code && dayjs(record.publishFromDate).isAfter(dayjs())) {
                color = '#52c41a';
            }
            return color;
        };

        const onSelectChange = selectedRowKeys => {
            store.commit('list/setSearchSelectedRow', selectedRowKeys);
            store.commit('list/setSearchSelectedAll', false);
        };

        const onSelectAll = selected => {
            store.commit('list/setSearchSelectedAll', selected);
        };

        const onEdit = record => {
            processingItem.value = record;
        };

        return {
            searchResult,
            pagination,
            getStatusColor,
            isLoading,
            onChange,
            selectedRowKeys,
            onChangeSelected,
            onSelectChange,
            progress,
            onSelectAll,
            onEdit,
            STATUS_PRODUCT,
        };
    },
});
</script>

<style lang="scss">
.Result {
    margin-top: $primary-margin;

    .ant-table-thead {
        th {
            padding-top: 16px;
            padding-bottom: 16px;
            font-weight: 600;
        }
    }

    .clampline {
        overflow: hidden;
        -webkit-line-clamp: 2 !important;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        text-overflow: ellipsis;
    }

    .ant-radio-group {
        width: 100%;
    }
}
</style>
