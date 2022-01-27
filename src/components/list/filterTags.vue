<template>
    <div class="FilterTags">
        <span v-for="(filter, idx) in filterTags" :key="idx" class="ant-tag">
            {{ filter.label }}: {{ filter.value }}&nbsp; <CloseCircleOutlined @click="onRemoveTag(filter.name)" />
        </span>
        <span v-if="filterTags.length" class="FilterTags__Clear" @click="onClearTags">Xóa tất cả</span>
    </div>
</template>

<script>
import { defineComponent, computed, toRefs, inject } from 'vue';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash/fp';
import moment from 'moment';

export default defineComponent({
    name: 'FilterTags',
    components: { CloseCircleOutlined },
    props: {
        filterConfigs: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const store = useStore();
        const { filterConfigs } = toRefs(props);
        const filters = computed(() => store.state.list.filterCollected);
        const onSearch = inject('onSearch');

        const formatFilter = (filter, input) => {
            switch (filter.type) {
                case 'DateRange':
                    return [moment(input[0]).format('DD/MM/YYYY'), moment(input[1]).format('DD/MM/YYYY')].join(' - ');

                case 'Selection':
                    const { dataMapping, options } = filter.configs;
                    if (dataMapping) {
                        const foundOption = options.find(_ => _.value === input);

                        return foundOption?.label || input;
                    }
                    return input;

                case 'NumberRange':
                    return input.join(' - ');

                case 'Text':
                    return input;
            }
        };

        const filterTags = computed(() =>
            Object.keys(filters.value).reduce((acc, filter) => {
                if (filters.value[filter]) {
                    const config = filterConfigs.value.find(cfg => cfg.name === filter);
                    acc.push({
                        name: filter,
                        label: config.label,
                        value: formatFilter(config, filters.value[filter]),
                    });
                }

                return acc;
            }, [])
        );

        const onRemoveTag = tag => {
            const cloneFilter = cloneDeep(filters.value);
            delete cloneFilter[tag];

            store.commit('list/setFilterCollected', cloneDeep(cloneFilter));
            store.commit('list/setFilters', cloneDeep(cloneFilter));
            onSearch();
        };

        const onClearTags = () => {
            store.commit('list/setFilterCollected', {});
            store.commit('list/setFilters', {});
            onSearch();
        };

        return {
            onRemoveTag,
            onClearTags,
            filterTags,
        };
    },
});
</script>

<style lang="scss" scoped>
.FilterTags {
    margin-top: $primary-margin;
    padding-left: 1.6rem;

    .ant-tag {
        border: 1px solid $primary-color;
        border-radius: 1.6rem;
        background-color: #d4d0e6;
        color: $primary-color;
        line-height: 2.5rem;
        margin-bottom: 1rem;

        div {
            display: inline-block;
            margin-left: 4px;
            cursor: pointer;
        }
    }

    &__Clear {
        color: $primary-color;
        text-decoration: underline;

        &:hover {
            cursor: pointer;
            opacity: 0.9;
        }
    }
}
</style>
