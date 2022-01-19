<template>
    <Card class="AttributeSetSearchBar">
        <div class="AttributeSetSearchBar__Filter">
            <Search
                ref="inputRef"
                v-model:value="localKeyword"
                class="AttributeSetSearchBar__Input"
                :placeholder="searchConfigs.placeholder"
                allow-clear
                @search="onSearchEnter"
                @blur="onBlurSearch"
            />
            <Button class="AttributeSetSearchBar__Filter__Btn" type="primary" @click="onOpen">Lọc</Button>
            <slot name="ActionArea" />
            <Drawer title="Bộ lọc" placement="bottom" :height="300" closable :visible="visible" @close="onClose">
                <Form>
                    <Row :gutter="24">
                        <Col v-for="(filter, idx) in filterConfigsRef" :key="idx" :span="filter.span">
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
                    <div class="AttributeSetSearchBar__Action">
                        <Button style="margin-right: 8px" @click="onResetFilters"> Làm mới</Button>
                        <Button type="primary" @click="search">Tìm kiếm</Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    </Card>
</template>

<script>
import { defineComponent, defineAsyncComponent, watch, computed, inject, ref, provide, toRefs } from 'vue';
import { Card, Input, Select, message, Button, Drawer, Form, Row, Col } from 'ant-design-vue';
import { useStore } from 'vuex';
import { trim, cloneDeep } from 'lodash/fp';
import { useCommon } from '@/composables/common/common';

const { Search } = Input;
const { Item: FormItem } = Form;

export default defineComponent({
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
    setup(props) {
        const { filterConfigs: filterConfigsRef } = toRefs(props);
        const { resultBrand, getCategory } = useCommon();
        getCategory();
        const store = useStore();
        const onSearch = inject('onSearch');
        const filters = computed(() => store.state.attributeSet.list.data.filters);
        const filterCollected = computed(() => store.state.attributeSet.list.data.filterCollected);
        const localKeyword = ref('');
        const visible = ref(false);
        const inputRef = ref(null);
        const keyword = computed(() => store.state.attributeSet.list.data.keyword);
        const selectedRow = computed(() => store.state.attributeSet.list.data.selectedRow);
        const onOpen = () => {
            store.commit('attributeSet/setFilters', cloneDeep(filterCollected.value));
            visible.value = true;
        };
        const onClose = () => {
            visible.value = false;
        };
        const onResetFilters = () => {
            store.commit('attributeSet/setFilterCollected', {});
            store.commit('attributeSet/setFilters', {});
            onSearch();
            onClose();
        };
        const onBlurSearch = e => {
            const value = trim(e.target.value);
            localKeyword.value = value;
            store.commit('attributeSet/setSearchKeyword', value);
            store.commit('attributeSet/setSearchPaginationCurrent', 1);
            onSearch();
        };
        const onSearchEnter = val => {
            const value = trim(val);
            localKeyword.value = value;
            store.commit('attributeSet/setSearchKeyword', value);
            store.commit('attributeSet/setSearchPaginationCurrent', 1);
            onSearch();
        };
        const onChange = data => {
            store.commit('attributeSet/setSearchFilters', cloneDeep(data));
        };
        provide('onChange', onChange);
        const search = () => {
            store.commit('attributeSet/setFilterCollected', cloneDeep(filters.value));
            store.commit('attributeSet/setSearchPaginationCurrent', 1);
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
        watch(
            () => resultBrand.value,
            () => {
                if (resultBrand.value) {
                    filterConfigsRef.value.forEach(element => {
                        if (element.key === 'category') {
                            element.configs.options = store.state.attributeSet.common.data.optionCategory.map(_ => ({
                                value: _.id,
                                label: _.label,
                            }));
                        }
                        if (element.key === 'brand') {
                            element.configs.options = store.state.attributeSet.common.data.optionBrand.map(_ => ({
                                value: _.id,
                                label: _.label,
                            }));
                        }
                    });
                }
            }
        );

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
            filterConfigsRef,
        };
    },
});
</script>

<style lang="scss">
.AttributeSetSearchBar {
    .ant-card-body {
        display: flex;
    }

    &__Filter {
        flex: 1;
        display: flex;
        justify-content: space-between;

        .ant-input-search-button {
            border-left: none;
        }
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

.ant-drawer-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    width: 56px;
    height: 56px;
    padding: 0;
    color: #00000073;
    font-weight: 700;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color 0.3s;
    text-rendering: auto;
}
</style>
