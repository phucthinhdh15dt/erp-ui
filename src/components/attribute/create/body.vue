<template>
    <Card style="min-height: 400px">
        <Row type="flex">
            <Col :span="8">
                <FormItem label="Ngành hàng" v-bind="validateInfos['category']">
                    <Select
                        v-model:value="modelRef.category"
                        label-in-value
                        allow-clear
                        placeholder="Chọn ngành hàng"
                        size="large"
                        @change="onChangeCategory"
                    >
                        <Option v-for="item in categorys" :key="item.id" :value="item.name"> {{ item.name }}</Option>
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
                        <Option v-for="item in brands" :key="item.id" :value="item.name"> {{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Propertie />
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row } from 'ant-design-vue';
import { inject, ref, watch } from 'vue';
import Propertie from '@/components/attribute/create/propertie.vue';
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
        Propertie,
    },
    setup() {
        const categorys = ref([]);
        const brands = ref([]);
        const modelRef = inject('modelRef');
        const validateInfos = inject('validateInfos');
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
                if (resultBrand.value) {
                    brands.value = resultBrand.value;
                }
            }
        );

        const onChangeCategory = () => {};

        const onChangeBrand = () => {};
        return {
            modelRef,
            categorys,
            onChangeCategory,
            brands,
            onChangeBrand,
            validateInfos,
        };
    },
};
</script>
<style scoped lang="scss"></style>
