<template>
    <Card style="min-height: 400px">
        <Row class="AttributeDetailBody">
            <Row>
                <Col :span="8" class="AttributeDetailBody__Item">
                    <FormItem label="Ngành hàng" v-bind="validateInfos.category">
                        <label v-if="!isEdit && modelRef.category" style="font-weight: bold">{{
                            modelRef.category.name
                        }}</label>
                        <Select
                            v-else
                            v-model:value="state.categoryName"
                            allow-clear
                            placeholder="Chọn ngành hàng"
                            size="large"
                            @change="onChangeCategory"
                        >
                            <Option v-for="item in resultCate" :key="item.code" :value="item.name">
                                {{ item.name }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
                <Col :span="8" class="AttributeDetailBody__Item">
                    <FormItem label="Thương hiệu">
                        <label v-if="!isEdit && modelRef.brand" style="font-weight: bold">{{
                            modelRef.brand.name
                        }}</label>
                        <Select
                            v-else
                            v-model:value="state.brandName"
                            allow-clear
                            placeholder="Chọn thương hiệu"
                            size="large"
                            @change="onChangeBrand"
                        >
                            <Option v-for="item in resultBrand" :key="item.code" :value="item.name">
                                {{ item.name }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="8" class="AttributeDetailBody__Item">
                    <FormItem label="Tên nhóm thuộc tính" v-bind="validateInfos.name">
                        <label v-if="!isEdit" style="font-weight: bold">{{ modelRef.name }}</label>
                        <Input
                            v-else
                            v-model:value="modelRef.name"
                            name="name"
                            :maxlength="80"
                            placeholder="Tên nhóm thuộc tính"
                            size="large"
                        />
                    </FormItem>
                </Col>
            </Row>
        </Row>
        <Properties />
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row } from 'ant-design-vue';
import { watch, ref, computed, reactive, inject } from 'vue';
import Properties from '@/components/attribute/detail/properties.vue';
import { useStore } from 'vuex';

import { useCommon } from '@/composables/common/common';

const { Item: FormItem } = Form;
const { Option } = Select;

export default {
    components: {
        Card,
        Select,
        FormItem,
        Input,
        Col,
        Option,
        Row,
        Properties,
    },
    setup() {
        const store = useStore();

        const state = reactive({
            categoryName: undefined,
            brandName: undefined,
        });
        const form = inject('form');
        const { validateInfos } = form;

        const modelRef = computed(() => store.state.attribute.detail.data);

        const isEdit = computed(() => store.state.attribute.detail.isEdit);

        const { getCategory, getBrand, resultBrand, result: resultCate } = useCommon();

        getCategory();

        watch(
            () => resultCate.value,
            () => {
                if (resultCate.value) {
                    getBrand();
                }
            }
        );

        watch(
            () => resultBrand.value,
            () => {
                if (resultBrand.value && modelRef.value) {
                    if (modelRef.value.category) {
                        const cate = resultCate.value.find(f => f.id === modelRef.value.category.id);
                        if (cate) {
                            state.categoryName = cate.name;
                        }
                        const brand = resultBrand.value.find(f => f.id === modelRef.value.brand.id);
                        if (brand) {
                            state.brandName = brand.name;
                        }
                    }
                }
            }
        );

        const onChangeCategory = (value, option) => {
            if (option !== undefined) {
                const object = resultCate.value.find(f => f.id === option.key);
                if (object) {
                    store.commit('attribute/setDetailAttributeCategory', object);
                    return;
                }
            }
            store.commit('attribute/setDetailAttributeCategory', undefined);
        };

        const onChangeBrand = (value, option) => {
            if (option !== undefined) {
                const object = resultBrand.value.find(f => f.id === option.key);
                if (object) {
                    store.commit('attribute/setDetailAttributeBrand', object);
                    return;
                }
            }
            store.commit('attribute/setDetailAttributeBrand', undefined);
        };

        return {
            isEdit,
            modelRef,
            resultCate,
            resultBrand,
            onChangeBrand,
            onChangeCategory,
            state,
            validateInfos,
        };
    },
};
</script>
<style scoped lang="scss">
.AttributeDetailBody {
    &__Item {
        padding-right: 24px;
    }
}
</style>
