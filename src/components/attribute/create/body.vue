<template>
    <Card style="min-height: 400px">
        <Row type="flex">
            <Col :span="8">
                <FormItem label="Ngành hàng" v-bind="validateInfos['category']">
                    <Select
                        v-model:value="modelRef.category"
                        label-in-value
                        placeholder="Chọn ngành hàng"
                        size="large"
                        @change="onChangeCategory"
                    >
                        <Option v-for="item in resultCate" :key="item.id" :value="item.name"> {{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="Tên nhóm thuộc tính" v-bind="validateInfos['name']">
                    <Input
                        v-model:value="modelRef.name"
                        name="name"
                        :maxlength="80"
                        placeholder="Tên nhóm thuộc tính"
                        size="large"
                    />
                </FormItem>
            </Col>

            <Col :span="8">
                <FormItem label="Thương hiệu" v-bind="validateInfos['brand']" style="margin-left: 24px">
                    <Select
                        v-model:value="modelRef.brand"
                        label-in-value
                        allow-clear
                        placeholder="Chọn thương hiệu"
                        size="large"
                        @change="onChangeBrand"
                    >
                        <Option v-for="item in resultBrand" :key="item.id" :value="item.name"> {{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="Số thứ tự" style="margin-left: 24px">
                    <InputNumber v-model:value="modelRef.groupOrder" size="large" :min="1" :max="10000"></InputNumber>
                </FormItem>
                <FormItem label="Vị trí" v-bind="validateInfos['layoutPosition']" style="margin-left: 24px">
                    <Select
                        v-model:value="modelRef.layoutPosition"
                        placeholder="Chọn vị trí"
                        label-in-value
                        size="large"
                        style="width: 150px"
                    >
                        <Option v-for="position in AttributePosition" :key="position.id" :value="position.text">
                            {{ position.text }}</Option
                        >
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Properties />
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row, InputNumber, message } from 'ant-design-vue';
import { inject, ref, watch } from 'vue';
import Properties from '@/components/attribute/create/properties.vue';
import { useCommon } from '@/composables/common/common';
import { AttributePosition } from '@/constants/attribibute';
import store from '@/store';

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
        InputNumber,
    },
    setup() {
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validateInfos } = form;

        const { getCategory, errorMessage, getBrand, resultBrand, result: resultCate } = useCommon();

        getCategory();

        watch(
            () => resultCate.value,
            () => {
                if (resultCate.value) {
                    getBrand();
                }
            }
        );

        const onChangeCategory = (value, option) => {
            debugger;
            store.commit('attribute/setAttributeCreateCategory', option);
        };

        const onChangeBrand = (value, option) => {
            store.commit('attribute/setAttributeCreateBrand', option);
        };
        return {
            modelRef,
            resultCate,
            onChangeCategory,
            resultBrand,
            onChangeBrand,
            validateInfos,
            AttributePosition,
        };
    },
};
</script>
<style scoped lang="scss"></style>
