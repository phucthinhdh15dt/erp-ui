<template>
    <div class="Result">
        <Table
            :data-source="searchResult.data"
            :columns="columns"
            :loading="isLoading"
            :pagination="pagination"
            :row-key="record => record[searchConfigs.rowKey]"
            :scroll="{ x: 1000 }"
            :row-selection="{ selectedRowKeys, onChange: onSelectChange, onSelectAll }"
            @change="onChange"
        >
            <template #radio="{ record }">
                <span style="color: #53459b"> <Radio :value="record.id" /> </span>
            </template>
            <template #id="{ text: id }">
                <span>
                    <a class="id-style" :href="`/${searchConfigs.urlParam}/${id}`">#{{ id }}</a>
                </span>
            </template>
            <template #clampline="{ text: text }">
                <span class="clampline">
                    {{ text }}
                </span>
            </template>
            <template #status="{ text: status }">
                <Status v-if="status" :code="status.code" />
            </template>
            <template #datetime="{ text: status }">
                <Datetime :value="status" />
            </template>
        </Table>
    </div>
</template>

<script>
import { defineComponent, computed, inject, watch, ref } from 'vue';
import { Table, Radio } from 'ant-design-vue';
import { useStore } from 'vuex';
import { STATUS } from '@/constants';
import { getOr } from 'lodash/fp';
import moment from 'moment';
import Status from '@/components/common/status.vue';
import Datetime from '@/components/common/datetime.vue';

export default defineComponent({
    name: 'Result',
    components: { Table, Radio, Status, Datetime },
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
            if (record.status === STATUS.PUBLISHED.code && moment(record.publishFromDate).isAfter(moment())) {
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

        return {
            STATUS,
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
