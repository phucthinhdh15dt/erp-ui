<template>
    <Spin tip="Đang tải..." :spinning="loading">
        <Card style="min-height: 400px">
            <Row class="AttributeSetBody">
                <Row>
                    <Col :span="8" class="AttributeSetBody__Item">
                        <FormItem label="Ngành hàng" v-bind="validateInfos['category']">
                            <Select
                                v-model:value="modelRef.category"
                                label-in-value
                                placeholder="Chọn ngành hàng"
                                size="large"
                                @change="onChangeCategory"
                            >
                                <Option v-for="item in resultCate" :key="item.code" :value="item.code">
                                    {{ item.label }}</Option
                                >
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="8" class="AttributeSetBody__Item">
                        <FormItem label="Thương hiệu" v-bind="validateInfos['brand']">
                            <Select
                                v-model:value="modelRef.brand"
                                label-in-value
                                placeholder="Chọn thương hiệu"
                                size="large"
                                @change="onChangeBrand"
                            >
                                <Option v-for="item in resultBrand" :key="item.code" :value="item.code">
                                    {{ item.label }}</Option
                                >
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="8" class="AttributeSetBody__Item">
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
    </Spin>
</template>
<script>
import { Card, Form, Select, Input, Col, Row, Spin } from 'ant-design-vue';
import { inject, ref, watch } from 'vue';
import Properties from '@/components/attributeset/create/properties.vue';
import { useCommon } from '@/composables/common/common';
import { useStore } from 'vuex';

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
        Spin,
    },
    setup() {
        const store = useStore();
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validateInfos } = form;

        const { getCategory, resultBrand, result: resultCate, loading } = useCommon();

        getCategory();

        const onChangeCategory = (value, option) => {
            store.commit('attributeSet/setAttributeSetCreateCategory', option);
        };

        const onChangeBrand = (value, option) => {
            store.commit('attributeSet/setAttributeSetCreateBrand', option);
        };
        return {
            modelRef,
            resultCate,
            onChangeCategory,
            resultBrand,
            onChangeBrand,
            validateInfos,
            loading,
        };
    },
};
</script>
<style scoped lang="scss">
.AttributeSetBody {
    &__Item {
        padding-right: 24px;
    }
}
</style>
