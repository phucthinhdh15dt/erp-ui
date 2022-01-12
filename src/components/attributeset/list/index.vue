<template>
    <div class="AttributeSetList">
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
import { useSearch } from '@/composables/list/index';
import { omitBy, isNil } from 'lodash/fp';
import ResultTable from './resultTable.vue';
import SearchBar from './searchBar.vue';
import FilterTags from './filterTags.vue';

export default defineComponent({
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
        const filters = computed(() => store.state.attribute.list.data.filters);
        const keyword = computed(() => store.state.attribute.list.data.keyword);
        const pagination = computed(() => store.state.attribute.list.data.pagination);
        const searchQuery = computed(() => {
            const filtersCollected = Object.keys(filters.value).reduce((acc, filter) => {
                if (filters.value[filter]) {
                    const config = filterConfigs.value.find(_ => _.name === filter);
                    const rawValue = toRaw(filters.value[filter]);
                    switch (config.type) {
                        case 'NumberRange':
                            if (Number.isInteger(rawValue[0]) && Number.isInteger(rawValue[1])) {
                                acc.push({
                                    range: {
                                        [filter]: {
                                            gte: rawValue[0],
                                            lte: rawValue[1],
                                        },
                                    },
                                });
                            }
                            break;
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
            debugger;
            store.commit('attribute/setSearchSelectedRow', []);
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

</style>
