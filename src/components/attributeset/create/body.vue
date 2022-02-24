<template>
    <Card>
        <Spin tip="Đang tải..." :spinning="loading">
            <Row class="AttributeSetBody">
                <Row>
                    <Col :span="12" class="AttributeSetBody__Item">
                        <FormItem label="Ngành hàng" v-bind="validateInfos['category']">
                            <Select
                                v-model:value="modelRef.category"
                                label-in-value
                                show-search
                                :filter-option="filterOption"
                                placeholder="Chọn ngành hàng"
                                @change="onChangeCategory"
                            >
                                <Option
                                    v-for="item in resultCate"
                                    :key="item.code"
                                    :value="item.code"
                                    :label="item.label"
                                >
                                    {{ item.label }}</Option
                                >
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="12" class="AttributeSetBody__Item">
                        <FormItem label="Thương hiệu" v-bind="validateInfos['brand']">
                            <Select
                                v-model:value="modelRef.brand"
                                label-in-value
                                allow-clear
                                show-search
                                :filter-option="filterOption"
                                placeholder="Chọn thương hiệu"
                                @change="onChangeBrand"
                            >
                                <Option
                                    v-for="item in resultBrand"
                                    :key="item.code"
                                    :value="item.code"
                                    :label="item.label"
                                >
                                    {{ item.label }}</Option
                                >
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="12" class="AttributeSetBody__Item">
                        <FormItem label="Tên nhóm" v-bind="validateInfos['name']">
                            <Input
                                v-model:value="modelRef.name"
                                name="name"
                                :maxlength="80"
                                placeholder="Tên nhóm thuộc tính"
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Row>
            <Properties />
        </Spin>
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row, Spin } from 'ant-design-vue';
import { inject } from 'vue';
import Properties from '@/components/attributeset/create/properties.vue';
import { useCommon } from '@/composables/common/common';
import { useStore } from 'vuex';
import { filterOption } from '@/utils/common';

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
            filterOption,
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
