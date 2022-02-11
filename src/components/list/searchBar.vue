<template>
    <Card class="SearchBar">
        <div class="SearchBar__Filter">
            <Search
                ref="inputRef"
                v-model:value="localKeyword"
                class="SearchBar__Input"
                enter-button
                :placeholder="searchConfigs.placeholder"
                allow-clear
                @search="onSearchEnter"
                @blur="onBlurSearch"
            />
            <Button
                v-if="filterConfigs && filterConfigs.length > 0"
                class="SearchBar__Filter__Btn"
                type="primary"
                @click="onOpen"
                >Lọc</Button
            >
            <slot name="ActionArea" />
            <Drawer title="Bộ lọc" placement="bottom" :height="300" closable :visible="visible" @close="onClose">
                <Form>
                    <Row :gutter="24">
                        <Col v-for="(filter, idx) in filterConfigs" :key="idx" :span="filter.span">
                            <FormItem :label="filter.label">
                                <component
                                    :is="filter.type"
                                    :name="filter.name"
                                    :configs="filter.configs"
                                    :on-change="onChange"
                                    :value="filters[filter.name]"
                                ></component>
                            </FormItem>
                        </Col>
                    </Row>
                    <div class="SearchBar__Action">
                        <Button style="margin-right: 8px" @click="onResetFilters">Làm mới</Button>
                        <Button type="primary" @click="search">Tìm kiếm</Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    </Card>
</template>

<script>
import { defineComponent, defineAsyncComponent, watch, computed, inject, ref, provide } from 'vue';
import { Card, Input, Select, message, Button, Drawer, Form, Row, Col } from 'ant-design-vue';
import { useStore } from 'vuex';
import { trim, cloneDeep } from 'lodash/fp';

const { Search } = Input;
const { Item: FormItem } = Form;

export default defineComponent({
    name: 'SearchBar',
    components: {
        Card,
        Search,
        Select,
        Button,
        Drawer,
        Form,
        FormItem,
        Row,
        Col,
        Text: defineAsyncComponent(() => import(`./filters/text.vue`)),
        DateRange: defineAsyncComponent(() => import(`./filters/dateRange.vue`)),
        NumberRange: defineAsyncComponent(() => import(`./filters/numberRange.vue`)),
        Selection: defineAsyncComponent(() => import(`./filters/selection.vue`)),
    },
    props: {
        filterConfigs: {
            type: Array,
            default: () => [],
        },
        searchConfigs: {
            type: Array,
            default: () => {},
        },
    },
    setup() {
        const store = useStore();
        const onSearch = inject('onSearch');
        const filters = computed(() => store.state.list.filters);
        const filterCollected = computed(() => store.state.list.filterCollected);
        const localKeyword = ref('');
        const visible = ref(false);
        const inputRef = ref(null);
        const keyword = computed(() => store.state.list.keyword);
        const selectedRow = computed(() => store.state.list.selectedRow);

        const onOpen = () => {
            store.commit('list/setFilters', cloneDeep(filterCollected.value));
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };

        const onResetFilters = () => {
            store.commit('list/setFilterCollected', {});
            store.commit('list/setFilters', {});
            onSearch();
            onClose();
        };

        const onBlurSearch = e => {
            const value = trim(e.target.value);
            localKeyword.value = value;
            store.commit('list/setSearchKeyword', value);
            store.commit('list/setSearchPaginationCurrent', 1);
            onSearch();
        };

        const onSearchEnter = val => {
            const value = trim(val);
            localKeyword.value = value;
            store.commit('list/setSearchKeyword', value);
            store.commit('list/setSearchPaginationCurrent', 1);
            onSearch();
        };

        const onChange = data => {
            store.commit('list/setSearchFilters', cloneDeep(data));
        };
        provide('onChange', onChange);

        const search = () => {
            store.commit('list/setFilterCollected', cloneDeep(filters.value));
            store.commit('list/setSearchPaginationCurrent', 1);
            onSearch();
            onClose();
        };

        watch(
            keyword,
            () => {
                if (!keyword.value) {
                    localKeyword.value = '';
                }
            },
            { deep: true }
        );

        const onRecovery = () => {
            message.warning('comming soon!');
        };

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        return {
            inputRef,
            onSearchEnter,
            filters,
            keyword,
            localKeyword,
            onChange,
            onRecovery,
            selectedRow,
            onBlurSearch,
            filterOption,
            visible,
            onOpen,
            onClose,
            search,
            filterCollected,
            onResetFilters,
        };
    },
});
</script>

<style lang="scss">
.SearchBar {
    .ant-card-body {
        display: flex;
    }

    &__Filter {
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    &__Action {
        //     width: fit-content;
        //     flex: 1;
        //     justify-content: end;
        //     text-align: right;
        //     // width: 240px;

        //     &--delete {
        //         margin-left: 1rem;
        //     }
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        padding: 10px 16px;
        background: #fff;
        text-align: right;
        z-index: 1;
    }

    &__Input {
        width: 400px;
        // height: 38px;
        margin-right: 10px;
    }

    &__Selection {
        width: 140px;
        margin-left: 1rem !important;

        .ant-select-selector {
            height: 38px !important;
        }

        .ant-select-selection-item,
        .ant-select-selection-placeholder {
            line-height: 38px !important;
        }
    }
}
</style>
