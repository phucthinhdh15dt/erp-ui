<template>
    <Card style="min-height: 400px">
        <Form>
            <Row type="flex">
                <Col :span="7">
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
                            <Option v-for="item in categorys" :key="item.id" :value="item.name">
                                {{ item.name }}</Option
                            >
                        </Select>
                    </FormItem>
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

                <Col :span="7">
                    <FormItem label="Thương hiệu" style="margin-left: 24px">
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
                            <Option v-for="item in resultBrand" :key="item.id" :value="item.name">
                                {{ item.name }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Properties />
        </Form>
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row } from 'ant-design-vue';
import { watch, ref, computed, reactive, inject } from 'vue';
import Properties from '@/components/attribute/detail/properties.vue';
import { useStore } from 'vuex';

import { useCreate } from '@/composables/attribute/create';

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
        Form,
        Properties,
    },
    setup() {
        const store = useStore();

        const categorys = ref([]);
        const state = reactive({
            categoryName: undefined,
            brandName: undefined,
        });
        const form = inject('form');
        const { validateInfos } = form;

        const modelRef = computed(() => store.state.attribute.detail.data);

        const isEdit = computed(() => store.state.attribute.detail.isEdit);

        const { getCategory, getBrand, resultBrand, resultCate } = useCreate();

        getCategory();

        watch(
            () => resultCate.value,
            () => {
                if (resultCate.value) {
                    categorys.value = resultCate.value;
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
            categorys,
            resultBrand,
            onChangeBrand,
            onChangeCategory,
            state,
            validateInfos,
        };
    },
};
</script>
<style scoped lang="scss"></style>
