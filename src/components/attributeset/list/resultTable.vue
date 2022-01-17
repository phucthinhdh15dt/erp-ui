<template>
    <div class="AttributeSetResult">
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
            <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'id'">
                    <span>
                        <a class="id-style" :href="`/${searchConfigs.urlParam}/${text}`">#{{ text }}</a>
                    </span>
                </template>
            </template>
            <!-- <template #radio="{ record }">
                <span style="color: #53459b"> <Radio :value="record.id" /> </span>
            </template>
            <template #id="{ text: id }">
                <span style="color: red">
                    <a class="id-style" @click="onEdit">#{{ id }}</a>
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
            </template> -->
        </Table>
    </div>
</template>

<script>
import { defineComponent, computed, inject, watch } from 'vue';
import { Table } from 'ant-design-vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'AttributeSetResult',
    components: { Table },
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
        const searchResult = computed(() => store.state.attributeSet.list.data.results);
        const isLoading = computed(() => store.state.attributeSet.list.data.isLoading);
        const paginationStored = computed(() => store.state.attributeSet.list.data.pagination);
        const selectedRowKeys = computed(() => store.state.attributeSet.list.data.selectedRow);
        const progress = computed(() => store.state.attributeSet.list.data.progress);

        const onChange = pagination => {
            const { current } = pagination;
            store.commit('attributeSet/setSearchSelectedRow', []);
            store.commit('attributeSet/setSearchPagination', {
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
                store.commit('attributeSet/setSearchSelectedAll', false);
                onSearch();
            },
            { deep: true }
        );
        const onChangeSelected = e => {
            const value = e.target.value;
            store.commit('attributeSet/setSearchSelectedRow', value);
        };

        const onSelectChange = selectedRowKeys => {
            store.commit('attributeSet/setSearchSelectedRow', selectedRowKeys);
            store.commit('attributeSet/setSearchSelectedAll', false);
        };
        const onSelectAll = selected => {
            store.commit('attributeSet/setSearchSelectedAll', selected);
        };
        return {
            searchResult,
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
