<template>
    <Card style="min-height: 400px">
        <Row class="AttributeBody">
            <Row>
                <Col :span="8" class="AttributeBody__Item">
                    <FormItem label="Ngành hàng" v-bind="validateInfos['category']">
                        <Select
                            v-model:value="modelRef.category"
                            label-in-value
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
                <Col :span="8" class="AttributeBody__Item">
                    <FormItem label="Thương hiệu" v-bind="validateInfos['brand']">
                        <Select
                            v-model:value="modelRef.brand"
                            label-in-value
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
                <Col :span="8" class="AttributeBody__Item">
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
            </Row>
        </Row>
        <Properties />
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row } from 'ant-design-vue';
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
<style scoped lang="scss">
.AttributeBody {
    &__Item {
        padding-right: 24px;
    }
}
</style>
