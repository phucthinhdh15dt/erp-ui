<template>
    <div class="PostList">
        <Form label-align="left">
            <SearchBar :filter-configs="filterConfigs" :search-configs="searchConfigs">
                <template #ActionArea>
                    <slot name="ActionArea" />
                </template>
            </SearchBar>
            <FilterTags :filter-configs="filterConfigs" />
            <ResultTable :columns="columns" :search-configs="searchConfigs" />
        </Form>
    </div>
</template>

<script>
import { defineComponent, computed, provide, onMounted, toRefs, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useSearch } from '@/composables/attribute/list/index';
import { omitBy, isNil } from 'lodash/fp';

import ResultTable from './resultTable.vue';
import SearchBar from './searchBar.vue';
import FilterTags from './filterTags.vue';

export default defineComponent({
    name: 'PostList',
    components: {
        SearchBar,
        ResultTable,
        FilterTags,
        Form,
    },
    props: {
        name: {
            type: String,
            default: () => '',
        },
        columns: {
            type: Array,
            default: () => [],
        },
        filterConfigs: {
            type: Array,
            default: () => [],
        },
        filterDefault: {
            type: Array,
            default: () => [],
        },
        searchConfigs: {
            type: Object,
            default: () => {},
        },
        sortConfigs: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const { filterConfigs, filterDefault, searchConfigs, sortConfigs, name } = toRefs(props);
        const store = useStore();
        const { search } = useSearch();

        const filters = computed(() => store.state.list.filters);
        const keyword = computed(() => store.state.list.keyword);
        const pagination = computed(() => store.state.list.pagination);

        const searchQuery = computed(() => {
            const filtersCollected = Object.keys(filters.value).reduce((acc, filter) => {
                if (filters.value[filter]) {
                    const config = filterConfigs.value.find(_ => _.name === filter);
                    const rawValue = toRaw(filters.value[filter]);

                    switch (config.type) {
                        default:
                            acc.push({
                                match: { [filter]: rawValue },
                            });
                            break;
                    }
                }

                return acc;
            }, []);

            const searchData = {
                filters: filtersCollected,
                searchConfigs: searchConfigs.value,
                filterDefault: filterDefault.value,
                offset: (pagination.value.current - 1) * pagination.value.limit,
                limit: pagination.value.limit,
            };

            if (sortConfigs.value.length) {
                searchData.sortConfigs = sortConfigs.value;
            }

            if (keyword.value) {
                searchData.search = keyword.value;
            }

            return omitBy(isNil)(searchData);
        });

        const onSearch = () => {
            store.commit('list/setSearchSelectedRow', []);
            search(name.value, searchQuery.value);
        };

        onMounted(onSearch);
        provide('onSearch', onSearch);
        provide('searchQuery', searchQuery);

        return {};
    },
});
</script>

<style lang="scss" scoped>
.PostList {
    margin-right: $primary-margin;

    &__Summary {
        margin-bottom: 0 !important;
        border: none;
    }
}

.PostContent {
    margin-top: $primary-margin;
    min-height: calc(100vh - 538px);
    margin-bottom: 0 !important;
}
</style>
