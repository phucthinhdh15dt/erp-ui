<template>
    <div class="AttributeSetResult">
        <Table
            :data-source="searchAttributeSetResult.data"
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
        </Table>
    </div>
</template>

<script>
import { defineComponent, computed, inject, watch, ref } from 'vue';
import { Table, Radio } from 'ant-design-vue';
import { useStore } from 'vuex';
import { getOr } from 'lodash/fp';
import moment from 'moment';
export default defineComponent({
    name: 'AttributeSetResult',
    components: { Table, Radio },
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
        const searchAttributeSetResult = computed(() => store.state.attribute.list.data.AttributeSetResults);
        const isLoading = computed(() => store.state.attribute.list.data.isLoading);
        const paginationStored = computed(() => store.state.attribute.list.data.pagination);
        const selectedRowKeys = computed(() => store.state.attribute.list.data.selectedRow);
        const progress = computed(() => store.state.attribute.list.data.progress);
        const onChange = pagination => {
            const { current } = pagination;
            store.commit('attribute/setSearchSelectedRow', []);
            store.commit('attribute/setSearchPagination', {
                ...paginationStored.value,
                current,
            });
        };
        const pagination = computed(() => ({
            total: searchAttributeSetResult.value.total,
            current: paginationStored.value.current,
            defaultPageSize: paginationStored.value.defaultPageSize,
            hideOnSinglePage: true,
        }));
        watch(
            paginationStored,
            () => {
                store.commit('attribute/setSearchSelectedAll', false);
                onSearch();
            },
            { deep: true }
        );
        const onChangeSelected = e => {
            const value = e.target.value;
            store.commit('attribute/setSearchSelectedRow', value);
        };

        const onSelectChange = selectedRowKeys => {
            store.commit('attribute/setSearchSelectedRow', selectedRowKeys);
            store.commit('attribute/setSearchSelectedAll', false);
        };
        const onSelectAll = selected => {
            store.commit('attribute/setSearchSelectedAll', selected);
        };
        return {
            searchAttributeSetResult,
            pagination,
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
.AttributeSetResult {
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
